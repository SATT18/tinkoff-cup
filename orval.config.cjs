import services from './services'

const config = services.reduce((cfg, service) => {
  return {
    ...cfg,
    [service.name]: {
      output: {
        mode: 'tags-split',
        target: `src/api/${service.name}/tasks.ts`,
        schemas: `src/api/${service.name}/model`,
        client: 'react-query',
        mock: false,
        clean: true,
        prettier: true,
      },
      input: {
        target: `./schemas/${service.name}.yaml`,
      },
    },
  }
}, {})

export default config
