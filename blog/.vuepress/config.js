const path = require("path");
module.exports = (options, context, api) => {
  return {
    title: "天真笔录",
    description: "Web development, Frontend, JavaScript",
    theme: "@vuepress/blog",
    base: '/blog-vuepress/',
    // plugins: [
    //   [
    //     "@vuepress/google-analytics",
    //     {
    //       ga: process.env.GA
    //     }
    //   ]
    // ],
    themeConfig: {
      directories: [
        {
          id: "webpack",
          dirname: "_webpack",
          title: "Webpack",
          path: "/webpack/",
          itemPermalink: "/webpack/:year/:month/:day/:slug"
        },
        {
          id: "browser",
          dirname: "_browser",
          title: "浏览器",
          path: "/browser/",
          itemPermalink: "/browser/:year/:month/:day/:slug"
        },
        {
          id: "css",
          dirname: "_css",
          title: "Css",
          path: "/css/",
          itemPermalink: "/css/:year/:month/:day/:slug"
        },
        {
          id: "javascript",
          dirname: "_javascript",
          title: "javascript",
          path: "/javascript/",
          itemPermalink: "/js/:year/:month/:day/:slug"
        },
        {
          id: "weapp",
          dirname: "_weapp",
          title: "weapp",
          path: "/weapp/",
          itemPermalink: "/weapp/:year/:month/:day/:slug"
        },
        {
          id: "vue",
          dirname: "_vue",
          title: "vue",
          path: "/vue/",
          itemPermalink: "/vue/:year/:month/:day/:slug"
        },
        {
          id: "node",
          dirname: "_node",
          title: "node",
          path: "/node/",
          itemPermalink: "/node/:year/:month/:day/:slug"
        }
      ],
      sitemap: {
        hostname: "https://tzhen.vip/"
      },
      // comment: {
      //   service: "vssue",
      //   autoCreateIssue: true,
      //   prefix: "[Post]",
      //   owner: "newsbielt703",
      //   repo: "billy",
      //   clientId: "4119e8c1b0093fc5d034",
      //   clientSecret: "1ac1176791689b1ca31037c39489fc7b0667015d"
      // },
      // newsletter: {
      //   endpoint:
      //     "https://gmail.us5.list-manage.com/subscribe/post?u=942c0d587f8ea28269e80d6cd&amp;id=d77d789d53"
      // },
      // feed: {
      //   canonical_base: "https://tzhen.vip",
      //   posts_directories: ["/_en/"]
      // },
      nav: [
        {
          text: "JavaScript",
          link: "/javascript/"
        },
        {
          text: "Css",
          link: "/css/"
        },
        {
          text: "Webpack",
          link: "/webpack/"
        },
        {
          text: "浏览器",
          link: "/browser/"
        },
        {
          text: "杂谈",
          link: "/weapp/"
        },
        {
          text: "Vue",
          link: "/vue/"
        },
        {
          text: "Node",
          link: "/node/"
        }
        // {
        //   text: "八股",
        //   link: "/eight/"
        // }
      ],
      footer: {
        // contact: [
        //   {
        //     type: "github",
        //     link: "https://github.com/alwayslucky"
        //   },
        //   {
        //     type: "mail",
        //     link: "mailto:dreamlife_li@qq.com"
        //   }
        // ],
        copyright: [
          {
            text: "豫ICP备2022017924号-1",
            link: "https://beian.miit.gov.cn/"
          }
        ]
      },
      smoothScroll: true
    },
    alias: {
      "@assets": path.resolve(__dirname, "../assets")
    },
    port: 8090,
    configureWebpack: (config, isServer) => {
      if (!isServer) {
        // 修改客户端的 webpack 配置
        // config.devServer = {
        //   contentBase: path.join(__dirname, '../assets')
        // }
      }
    }
  };
};
