import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const temporary = await mkdtemp(join(tmpdir(), 'qq2007-build-check-'))
try {
  const outputs = []
  for (const [name, newline] of [['lf', '\n'], ['crlf', '\r\n']]) {
    const fixture = join(temporary, name)
    for (const directory of ['src', 'scripts', 'lib']) {
      await mkdir(join(fixture, directory), { recursive: true })
    }
    await cp(join(root, 'assets'), join(fixture, 'assets'), { recursive: true })
    await cp(join(root, 'scripts/build-client.mjs'), join(fixture, 'scripts/build-client.mjs'))
    for (const path of ['src/client.js', 'src/skin.css']) {
      const content = (await readFile(join(root, path), 'utf8')).replace(/\r\n?/g, '\n')
      await writeFile(join(fixture, path), content.replaceAll('\n', newline))
    }
    execFileSync(process.execPath, [join(fixture, 'scripts/build-client.mjs')], { stdio: 'pipe' })
    outputs.push(await readFile(join(fixture, 'lib/client.js')))
  }
  assert.deepEqual(outputs[0], outputs[1], 'LF and CRLF source checkouts must generate the same bundle')
  console.log(JSON.stringify({ ok: true, check: 'build-determinism', lineEndings: ['LF', 'CRLF'], bytes: outputs[0].length }))
} finally {
  assert.equal(dirname(temporary), resolve(tmpdir()), 'cleanup must stay inside the temporary directory')
  await rm(temporary, { recursive: true, force: true })
}
