import fs from 'node:fs';
import path from 'node:path';

function lint() {
  const rootPath = import.meta.dirname.split('build')[0];
  const componentsPath = path.resolve(rootPath + '/src/components');

  fs.readdir(
    componentsPath,
    {
      recursive: true,
    },
    (err, files) => {
    if (err) {
      throw err;
    };

    const map = new Map(
      files
        .filter((str) => !str.includes('.js'))
        .map((component) => ([
          component, {
            [component]: false,
            index: false,
          }
        ]))
    )

    files
      .filter((str) => str.includes('.js'))
      .forEach((str) => {
        const splittedStr = str.split('/');
        const component = splittedStr[0];
        const filename = splittedStr[1].split('.')[0];

        map.set(component, {...map.get(component), [filename]: true});
      });

    map.forEach((filenames, component) => {
      for (const filename in filenames) {
        if (filenames[filename] === false) {
          console.log(
            `Structure of component ${component} is broken! Missing ${filename}.js`
          );
        }
      }
    });
  });


};

lint();