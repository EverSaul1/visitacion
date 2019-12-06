import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  titulo: string = '';
  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {
    this.getDataRoute()
        .subscribe(data => {
          this.titulo = data.titulo;
          this.title.setTitle( this.titulo );

          let metaTag: MetaDefinition = {
            name: 'description',
            content: this.titulo
          };

          this.meta.updateTag(metaTag);

        });
   }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter(evento =>  evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map( (evento: ActivationEnd) => evento.snapshot.data )
    );
  }


}
