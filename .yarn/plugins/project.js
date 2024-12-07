module.exports = {
  name: `plugin-project`,
  factory: require => {
    const {BaseCommand} = require(`@yarnpkg/cli`);
    const {Manifest} = require(`@yarnpkg/core`);

    class GetProjectInfoCommand extends BaseCommand {
      static paths = [[`project`]];

      async getInfo() {
        return await Manifest.find('').then(data => {
          const dependencies =
            Object.entries(data.raw?.dependencies)
            .map(([key, value]) => `${key}: ${value}`);

          return JSON.stringify({
            name: data.raw?.name,
            version: data.raw?.version,
            description: data.raw?.description,
            dependencies
          });
        });
      }

      async execute() {
        const info = await this.getInfo();
        this.context.stdout.write(info);
      }
    }

    return {
      commands: [
        GetProjectInfoCommand,
      ],
    };
  }
};