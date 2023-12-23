#!/usr/bin/env node

/**
 * 相关代码逻辑参考create-vite，旨在学习脚手架构建逻辑
 */

const fs = require('fs');
const path = require('path');
// 终端交互，类似库还有：inquirer、commander
const prompts = require('prompts');
// 参数解析，类似库还有：yargs
const argv = require('minimist')(process.argv.slice(2), { string: ['_']});
// 终端输出着色，类似库还有：chalk
const {
  cyan,
  lightCyan,
  green,
  lightGreen,
  magenta,
  lightMagenta,
  red,
  reset
} = require('kolorist');

const checkIsExistDir = (path) => {
  return fs.existsSync(path)
}

const cwd = process.cwd();
const renameFiles = {
  _gitignore: '.gitignore'
}
const TEMPLATES = [
  {
    name: 'screen-react-ts',
    color: lightCyan,
  },
  {
    name: 'vue3',
    color: green,
  },
  {
    name: 'vue3-ts',
    color: lightGreen,
  },
  {
    name: 'react',
    color: magenta,
  },
  {
    name: 'react-ts',
    color: lightMagenta,
  },
  {
    name: 'koa-node',
    color: cyan,
  }
];
const TEMPLATE_NAMES = TEMPLATES.map(item => item.name);

const copyDir = (srcDir, destDir) => {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

const copy = (src, dest) => {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

// 文件复制或文件内容写入
const write = (root, templatePkgDir, file, content) => {
  const targetPath = renameFiles[file]
    ? path.join(root, renameFiles[file])
    : path.join(root, file)
  if (content) {
    fs.writeFileSync(targetPath, content)
  } else {
    copy(path.join(templatePkgDir, file), targetPath)
  }
}

const emptyDir = (dir) => {
  if (!fs.existsSync(dir)) {
    return
  }
  for (const file of fs.readdirSync(dir)) {
    const abs = path.resolve(dir, file)
    if (fs.lstatSync(abs).isDirectory()) {
      emptyDir(abs)
      fs.rmdirSync(abs)
    } else {
      fs.unlinkSync(abs)
    }
  }
}

const getPkgInfoFromUserAgent = (userAgent) => {
  if (!userAgent) return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1]
  }
}

const handleResultAfterPrompt = (promptResult, projectName, template) => {
  const { overwrite, selectTemplate } = promptResult
  // 项目根目录，创建或覆盖项目对应的目录
  const root = path.join(cwd, projectName);
  // 判断当前目录下是否存在同名项目目录
  if (overwrite) {
    emptyDir(root)
  } else if (!checkIsExistDir(root)) {
    fs.mkdirSync(root);
  }

  console.log(`\nScaffolding project in ${root}...\n`);

  const targetTemplate = template || selectTemplate.name
  // 获取指定模板路径地址
  const templatePkgDir = path.resolve(__dirname, `./templates/${targetTemplate}`);
  // 排除package.json，配置文件需要动态修改相关内容
  const templatePkgFiles = fs.readdirSync(templatePkgDir).filter((f) => f !== 'package.json');
  for (const file of templatePkgFiles) {
    write(root, templatePkgDir, file)
  }

  // 获取template package内配置文件并做相关处理
  const templatePkgJsonFile = require(path.join(templatePkgDir, `package.json`));
  templatePkgJsonFile.name = projectName;
  write(root, templatePkgDir, 'package.json', JSON.stringify(templatePkgJsonFile, null, 2));

  // npm or yarn相关命令提示
  // npm和config配置中存在user-agent（npm_config_user_agent）有相关包管理器信息
  const pkgInfo = getPkgInfoFromUserAgent(process.env.npm_config_user_agent);
  const pkgManager = pkgInfo ? pkgInfo.name : 'pnpm';

  console.log(`\n${green('Project created successfully')}.  Now run:\n`)

  if (root !== cwd) {
    console.log(`  cd ${path.relative(cwd, root)}`)
  }

  console.log(`  git init`);

  switch (pkgManager) {
    case 'pnpm':
      console.log('  pnpm install')
      console.log('  pnpm dev')
      break
    default:
      console.log(`  ${pkgManager} install`)
      console.log(`  ${pkgManager} run dev`)
      break
  }

}

const init = async () => {
  let result = {}
  let projectName = argv._[0];
  const template = argv.template;
  const defaultProjectName = projectName || 'template-project';

  const questions = [
    {
      // 命令行中设置项目名后就自动默认无需交互
      type: projectName ? null : 'text',
      name: 'projectName',
      message: 'Project name：',
      initial: defaultProjectName,
      onState: (state) => {
        projectName = state.value.trim() || defaultProjectName
      }
    },
    {
      // 对设置的项目名判断是否已存在对应目录，从而进行是否覆盖交互
      type: () => {
        return !checkIsExistDir(projectName) ? null : 'confirm';
      }, 
      name: 'overwrite',
      message: () =>
        (projectName === '.'
          ? 'Current directory'
          : `Target directory "${projectName}"`) +
        ` is not empty. Remove existing files and continue?`
    },
    {
      // 覆盖交互结果确认
      type: (_, { overwrite } = {}) => {
        if (overwrite === false) {
          throw new Error(red('✖') + ' Operation cancelled')
        }
        return null
      },
      name: 'overwriteChecker'
    },
    {
      // 提供模板select选择交互形式
      type: template && TEMPLATE_NAMES.includes(template) ? null : 'select',
      name: 'selectTemplate',
      message:
        typeof template === 'string' && !TEMPLATE_NAMES.includes(template)
          ? reset(
              `"${template}" isn't a valid template. Please choose from below: `
            )
          : reset('Select a template:'),
      initial: 0,
      choices: TEMPLATES.map((item) => {
        const colorFn = item.color
        return {
          title: colorFn(item.name),
          value: item
        }
      })
    },
  ];
  const promptOptions = {
    // 全局交互操作取消回调处理
    onCancel: () => {
      throw new Error(red('✖') + ' Operation cancelled')
    }
  };

  try {
    result = await prompts(questions, promptOptions);
    handleResultAfterPrompt(result, projectName, template);
  } catch(cancelled) {
    console.log(cancelled.message)
    return
  }
}

init().catch((e) => {
  console.error(e)
})