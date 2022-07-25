# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd blog/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@tzhen.vip:/home/git/blog-vuepress.git master

cd -