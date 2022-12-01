import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function adaptStringlength(str: string, amount: number) {
  if (str.length > amount) {
    str = str.slice(0, amount);
    str = str.concat('...');
  }
  return str;
}
