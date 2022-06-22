import { generator, toFile, when, writeJSON } from '@feathershq/pinion'
import { AppGeneratorContext } from '../index'

export const generate = (ctx: AppGeneratorContext) =>
  generator(ctx).then(
    when<AppGeneratorContext>(
      (ctx) => ctx.language === 'ts',
      writeJSON<AppGeneratorContext>(
        ({ lib }) => ({
          'ts-node': {
            files: true
          },
          compilerOptions: {
            target: 'es2020',
            module: 'commonjs',
            outDir: './dist',
            rootDir: `./${lib}`,
            strict: true,
            esModuleInterop: true
          },
          exclude: ['test']
        }),
        toFile('tsconfig.json')
      )
    )
  )