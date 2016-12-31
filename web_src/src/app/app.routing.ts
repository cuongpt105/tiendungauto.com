import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {path: 'admin', loadChildren: () => new Promise(resolve => {
            (require as any).ensure([], require => {
                resolve(require('./admin/admin.module').AdminModule);
            })
        })},

    {path: '',  loadChildren: () => new Promise(resolve => {
            (require as any).ensure([], require => {
                resolve(require('./components/client/client.module').ClientModule);
            })
        })}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}