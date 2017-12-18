import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    public anichars: Array<any>;
    public prefix_char: string;
    public allchairs: Array<any>;

  constructor() {

      this.allchairs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
          'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '?', ';', ':'];

      this.anichars = [];
      this.prefix_char = 'char-';

  }

}
