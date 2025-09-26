# Arts Calendar

A React calendar application for managing arts events with a Node.js/SQLite backend.

## Features

- **Event Management**: Create, view, and delete arts events
- **Calendar View**: Interactive calendar interface built with React
- **Database**: SQLite database for data persistence
- **Password Protection**: Secure event creation and deletion
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

- **Frontend**: React 18, Vite, React Router
- **Backend**: Node.js, Express, SQLite3
- **Deployment**: Vercel (serverless functions)
- **Styling**: CSS with responsive design

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/drquandary/arts-calendar.git
cd arts-calendar
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Deployment

### Vercel Deployment

This app is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the build settings
3. Deploy with one click!

The app includes:
- Serverless API functions in `/api` directory
- Automatic static file serving
- Database handling with SQLite

### Manual Deployment

To deploy manually:

```bash
npm run build
```

The `build` folder contains the production-ready files.

## Prerequisites

You'll get best use out of this project if you're familiar with basic JavaScript. This project is a static site, which means that the server builds the site from the content of the `src` folder while you're developing it, then it's able to serve the pages super quickly when the user requests them.

## What's in this project?

← `README.md`: That’s this file, where you can tell people what your cool website does and how you built it.

← `index.html`: This is the main page template React uses to build your site–it imports `index.jsx` to kick things off. When you're ready to share your site or add a custom domain, change SEO/meta settings in here.

← `src/`: This folder contains all the files React will use to build your site.

### Working in the `src/` folder 📁

React defines site components in [JSX](https://reactjs.org/docs/introducing-jsx.html), an extended version of JavaScript, so you'll see lots of `.jsx` files in the project.

← `src/index.jsx`: This is the root of your React app. The index script is imported in the site home template `index.html`. If you add libraries like [chakra-ui](https://chakra-ui.com) or [redux](https://react-redux.js.org), you'll insert their providers here. The `<HelmetProvider`> is an example of a provider you'd use.

← `src/app.jsx`: The base for defining your React app, this script imports the components that make up the site content. The `index.jsx` file imports the App script. The router (from [wouter](https://github.com/molefrog/wouter) 🐰) is also imported here.

← `src/styles`: CSS files add styling rules to your content. You have [a lot of](https://vitejs.dev/guide/features.html#css) importing options for CSS including CSS modules if that's your jam.

← `src/components/router.jsx`: One of the most important parts of a single page app is the router. It's how we know what page to show–the code maps the paths to the Home and About components. We're using [Wouter](https://github.com/molefrog/wouter), a tiny minimalist router. You could replace it for something like [React Router](https://reactrouter.com/).

← `src/components/seo.jsx`: When you share your site on social media, you'll want to make sure the meta tags are correct and that you've got an image. All of the settings for this file are in `src/seo.json`.

### Hooks 🪝

← `src/hooks/`: [Hooks](https://reactjs.org/docs/hooks-intro.html) are a powerful way to provide interaction with your app.

← `src/hooks/prefers-reduced-motion.jsx`: For accessibility reasons, some users will indicate in their system settings that they prefer motion effects to be minimized–this allows you to hold off on these effects in such cases.

← `src/hooks/wiggle.jsx`: The wiggle effect animates elements, as you'll see if you hover over the image (or text below it) on the homepage. You can apply the effect anywhere you like in the site as outlined in `TODO.md`.

### Pages 📃

← `src/pages/`: These files include components that specify the content of the Home and About pages. Each one is defined as a function and referenced in `router.jsx`. The content is built into the page outline specified in `app.jsx`.

← `src/pages/about.jsx`: The content of the About page, defined as a component function.

← `src/pages/home.jsx` The content of the Home page, also defined as a component function. The page includes the animated effect on hover, and title change effect on click (which is also a handy demo of using state data in React).

## Try this next 🏗️

Take a look in `TODO.md` for next steps you can try out in your new site!

**_Want a minimal version of this project to build your own React app? Check out [Blank React](https://glitch.com/edit/#!/remix/glitch-blank-react)!_**

![Glitch](https://cdn.glitch.com/a9975ea6-8949-4bab-addb-8a95021dc2da%2FLogo_Color.svg?v=1602781328576)

## You built this with Glitch!

[Glitch](https://glitch.com) is a friendly community where millions of people come together to build web apps and websites.

- Want more details about React on Glitch? We've got a [Help Center article](https://help.glitch.com/hc/en-us/articles/16287545215501-React-Projects) for you.
- Need more help? [Check out our Help Center](https://help.glitch.com/) for answers to any common questions.
- Ready to make it official? [Become a paid Glitch member](https://glitch.com/pricing) to boost your app with private sharing, more storage and memory, domains and more.
