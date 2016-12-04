import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
  pure: false
})

export class FileSizePipe implements PipeTransform {
  transform(bytes: number): string {
      var thresh = 1024;
      if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    var units = 1024
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    
    var u = -1;
    
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    
    return bytes.toFixed(1)+' '+units[u];
  }
}