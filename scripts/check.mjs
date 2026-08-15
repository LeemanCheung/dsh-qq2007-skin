import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const source = await readFile(resolve(root, 'lib/client.js'), 'utf8')
const pkg = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'))
const patch = await readFile(resolve(root, 'cordis.patch.yml'), 'utf8')

let loaded
const storage = new Map()
const byId = new Map()
const elements = []

function makeElement(tag) {
  const listeners = new Map()
  const attributes = new Map()
  const element = {
    tagName: tag.toUpperCase(),
    dataset: {},
    children: [],
    className: '',
    textContent: '',
    id: '',
    removed: false,
    appendChild(child) {
      this.children.push(child)
      child.parentElement = this
      if (child.id) byId.set(child.id, child)
      return child
    },
    setAttribute(name, value) {
      attributes.set(name, String(value))
      if (name === 'id') {
        this.id = String(value)
        byId.set(this.id, this)
      }
    },
    getAttribute(name) { return attributes.get(name) ?? null },
    removeAttribute(name) { attributes.delete(name) },
    addEventListener(name, handler) { listeners.set(name, handler) },
    removeEventListener(name) { listeners.delete(name) },
    click() { listeners.get('click')?.({ target: this }) },
    remove() {
      this.removed = true
      if (this.id) byId.delete(this.id)
    }
  }
  elements.push(element)
  return element
}

const body = makeElement('body')
const head = makeElement('head')
const documentElement = makeElement('html')
const documentListeners = new Map()
const document = {
  body,
  head,
  documentElement,
  createElement: makeElement,
  getElementById: (id) => byId.get(id) ?? null,
  addEventListener(name, handler) { documentListeners.set(name, handler) },
  removeEventListener(name) { documentListeners.delete(name) },
  querySelector(selector) {
    if (selector === 'style[data-plugin="dsh-qq2007-skin"]') {
      return elements.find((element) => element.tagName === 'STYLE' && element.dataset.plugin === 'dsh-qq2007-skin' && !element.removed) ?? null
    }
    return null
  }
}

const effectCleanups = []
const reactCleanups = []
let timeoutSeq = 10
const timeoutCallbacks = new Map()
function flushTimeouts() {
  const queued = [...timeoutCallbacks.entries()]
  timeoutCallbacks.clear()
  for (const [, callback] of queued) callback()
}
const React = {
  createElement: (type, props, ...children) => ({ type, props: props ?? {}, children }),
  useState: (initial) => [typeof initial === 'function' ? initial() : initial, () => {}],
  useEffect: (start) => {
    const cleanup = start()
    if (typeof cleanup === 'function') reactCleanups.push(cleanup)
  }
}
let audioNotes = 0
let audioResumes = 0
let audioClosed = false
class FakeAudioContext {
  constructor() {
    this.currentTime = 1
    this.destination = {}
    this.state = 'suspended'
  }
  createOscillator() {
    return {
      type: '',
      frequency: { setValueAtTime() {} },
      connect() {},
      start() { audioNotes += 1 },
      stop() {},
    }
  }
  createGain() {
    return {
      gain: {
        setValueAtTime() {},
        exponentialRampToValueAtTime() {},
      },
      connect() {},
    }
  }
  resume() { this.state = 'running'; audioResumes += 1; return Promise.resolve() }
  close() { this.state = 'closed'; audioClosed = true; return Promise.resolve() }
}
const sandbox = {
  window: {
    __ModuleLoader__: { load(value) { loaded = value } },
    AudioContext: FakeAudioContext,
    localStorage: {
      getItem(key) { return storage.get(key) ?? null },
      setItem(key, value) { storage.set(key, String(value)) }
    },
    setInterval() { return 7 },
    clearInterval() {},
    setTimeout(callback) {
      const id = ++timeoutSeq
      timeoutCallbacks.set(id, callback)
      return id
    },
    clearTimeout(id) { timeoutCallbacks.delete(id) }
  },
  document,
  console,
  Date,
  Object,
  Set,
  String
}
sandbox.window.document = document
vm.runInNewContext(source, sandbox, { filename: 'lib/client.js' })

assert.equal(loaded?.id, 'dsh-qq2007-skin')
assert.equal(typeof loaded.factory, 'function')
const plugin = loaded.factory((specifier) => {
  if (specifier === 'react') return React
  throw new Error(`unexpected client import: ${specifier}`)
})
assert.equal(typeof plugin.apply, 'function')
assert.equal(plugin.THEME_ID, 'dsh-qq2007-retro')
assert.equal(plugin.THEME.colorScheme, 'light')
assert.ok(Object.keys(plugin.THEME.tokens).length >= 50)

let registeredTheme
let disposedTheme = false
let themeChange
let activeId = 'light'
let settingsEntry
const theme = {
  register(definition) {
    registeredTheme = definition
    return () => { disposedTheme = true }
  },
  getTheme() { return { preference: activeId, active: { id: activeId }, revision: 1 } },
  setTheme(id) {
    activeId = id === 'system' ? 'light' : id
    themeChange?.({ preference: id, active: { id: activeId }, revision: 2 })
  }
}
const ctx = {
  theme,
  effect(start) {
    const cleanup = start()
    if (typeof cleanup === 'function') effectCleanups.push(cleanup)
  },
  on(event, handler) {
    assert.equal(event, 'theme/change')
    themeChange = handler
    return () => { themeChange = undefined }
  },
  slots: {
    inject(name, mount) {
      assert.equal(name, 'settings.general.item')
      return mount()
    },
    register(options, component) {
      settingsEntry = { options, component }
      return () => {}
    }
  }
}

plugin.apply(ctx)
assert.equal(registeredTheme?.id, plugin.THEME_ID)
assert.equal(activeId, plugin.THEME_ID, 'first install enables the skin')
assert.equal(body.getAttribute('data-dsh-qq2007-active'), 'true')
assert.equal(storage.get('dsh-qq2007-skin:enabled'), 'on')
assert.equal(documentElement.getAttribute('data-dsh-qq2007-installed'), 'true')
assert.ok(settingsEntry)

const style = elements.find((element) => element.tagName === 'STYLE' && element.dataset.plugin === 'dsh-qq2007-skin')
assert.ok(style?.textContent.includes('body[data-dsh-qq2007-active="true"]'))
assert.ok(style?.textContent.includes('prefers-reduced-motion'))
assert.ok(style?.textContent.includes('dsh-qq2007-windowbar'))
assert.ok(style?.textContent.includes('本地用户 · 皮肤启用'))
assert.ok(style?.textContent.includes('[aria-label="发送消息"]'))
assert.ok(style?.textContent.includes('width: 64px !important'))
assert.ok(!style?.textContent.includes('content: "▾"'), 'send chrome must not imply a nonexistent dropdown')
assert.ok(!source.includes('__QQ2007_'))
assert.ok((source.match(/data:image\/webp;base64,/g) ?? []).length >= 4)

const windowbar = byId.get('dsh-qq2007-windowbar')
assert.ok(windowbar)
assert.equal(windowbar.children[0].tagName, 'IMG')
assert.equal(windowbar.children[1].textContent, 'DSH Messenger')
assert.equal(windowbar.children[2].textContent, '2007')

const status = byId.get('dsh-qq2007-status')
assert.ok(status)
assert.equal(status.children[0].tagName, 'IMG')
assert.ok(status.children[0].src.startsWith('data:image/svg+xml;base64,'))
assert.equal(status.children[4].textContent, '双音发送提示')
assert.equal(status.dataset.sound, 'off')
assert.equal(status.children.at(-1).textContent, '退出皮肤')
assert.equal(documentListeners.size, 2)

// Regression: the Host-backed Appearance scope may adopt its built-in value
// just after immediate client plugins apply. First-run intent must survive that
// startup event and re-apply on the next task without persisting "off".
activeId = 'light'
themeChange({ preference: 'system', active: { id: 'light' }, revision: 3 })
assert.equal(body.getAttribute('data-dsh-qq2007-active'), null)
assert.equal(storage.get('dsh-qq2007-skin:enabled'), 'on')
flushTimeouts()
assert.equal(activeId, plugin.THEME_ID)
assert.equal(body.getAttribute('data-dsh-qq2007-active'), 'true')

const injected = settingsEntry.options.inject()
assert.equal(injected.getSoundEnabled(), false, 'the original send chime defaults off')
injected.setSoundEnabled(true)
assert.equal(storage.get('dsh-qq2007-skin:sound'), 'on')
assert.equal(status.dataset.sound, 'on')
assert.equal(audioNotes, 2, 'enabling sound previews the original two-note chime')
assert.equal(audioResumes, 1, 'the first user gesture resumes Web Audio')
const sendButton = {
  disabled: false,
  getAttribute: (name) => name === 'aria-label' ? '发送消息' : null,
  closest(selector) { return selector === 'button' ? this : selector === '[data-composer-card]' ? {} : null },
}
documentListeners.get('click')({ target: sendButton })
assert.equal(audioNotes, 4, 'the native send button triggers the two-note chime')
const textarea = {
  tagName: 'TEXTAREA',
  disabled: false,
  readOnly: false,
  value: 'hello',
  closest: (selector) => selector === '[data-composer-card]' ? {} : null,
}
documentListeners.get('keydown')({ target: textarea, key: 'Enter', shiftKey: false, isComposing: false })
assert.equal(audioNotes, 4, 'Enter waits for the native composer to begin submission')
textarea.value = ''
flushTimeouts()
assert.equal(audioNotes, 6, 'an Enter submission action triggers the same chime')
documentListeners.get('keydown')({ target: textarea, key: 'Enter', shiftKey: true, isComposing: false })
assert.equal(audioNotes, 6, 'Shift+Enter remains a silent newline gesture')
injected.setSoundEnabled(false)
assert.equal(storage.get('dsh-qq2007-skin:sound'), 'off')
assert.equal(status.dataset.sound, 'off')
injected.setEnabled(false)
assert.equal(activeId, 'light')
assert.equal(body.getAttribute('data-dsh-qq2007-active'), null)
assert.equal(storage.get('dsh-qq2007-skin:enabled'), 'off')
injected.setSoundEnabled(true)
assert.equal(audioNotes, 8, 'sound remains independently available under system appearance')
documentListeners.get('click')({ target: sendButton })
assert.equal(audioNotes, 10, 'system appearance does not disable the opted-in cue')
injected.setSoundEnabled(false)
injected.setEnabled(true)
assert.equal(activeId, plugin.THEME_ID)
assert.equal(body.getAttribute('data-dsh-qq2007-active'), 'true')
status.children.at(-1).click()
assert.equal(activeId, 'light')

for (const cleanup of reactCleanups.reverse()) cleanup()
for (const cleanup of effectCleanups.reverse()) cleanup()
assert.equal(disposedTheme, true)
assert.equal(style.removed, true)
assert.equal(status.removed, true)
assert.equal(windowbar.removed, true)
assert.equal(body.getAttribute('data-dsh-qq2007-active'), null)
assert.equal(documentListeners.size, 0)
assert.equal(audioClosed, true)

assert.equal(pkg.version, '0.3.0')
assert.equal(pkg.dsh.bundle.patch, './cordis.patch.yml')
assert.equal(pkg.dsh.client.platform, 'web')
assert.ok(pkg.keywords.includes('dsh-plugin'))
assert.ok(patch.includes("name: 'dsh-qq2007-skin'"))

console.log(JSON.stringify({
  ok: true,
  moduleId: loaded.id,
  themeTokens: Object.keys(plugin.THEME.tokens).length,
  clientBytes: Buffer.byteLength(source),
  lifecycle: 'register-enable-disable-cleanup'
}))
