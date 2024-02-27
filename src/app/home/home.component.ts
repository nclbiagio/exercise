import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { Post } from '../interfaces/post.interface';
import { Observable, combineLatest, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PostBaseComponent } from './components/post-base.component';
import { PostUpgradeComponent } from './components/post-upgrade.component';
import { User } from '../interfaces/user.interface';
import { PostDetailComponent } from './components/post-detail.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    AsyncPipe,
    PostBaseComponent,
    PostUpgradeComponent,
    PostDetailComponent,
  ],
  template: `
    <div class="home container mx-auto w-full p-4">
      <div class="switchViewButtonContainer flex flex-row w-full">
        <button
          (click)="switchView('base')"
          class="m-1 focus-ring relative flex items-center justify-center rounded-2xl px-5 py-2.5 bg-sky-600 text-white hover:bg-sky-600/80"
          type="button"
        >
          Base
        </button>
        <button
          (click)="switchView('upgrade')"
          class="m-1 focus-ring relative flex items-center justify-center rounded-2xl px-5 py-2.5 bg-sky-600 text-white hover:bg-sky-600/80"
          type="button"
        >
          Upgrade
        </button>
      </div>
      <!-- -->
      @if (detail) {
      <div class="postDetail-container w-full p-4 mt-4">
        <app-post-detail [detail]="detail" />
        <button
          (click)="closeDetail()"
          class="m-1 focus-ring relative flex items-center justify-center rounded-2xl px-5 py-2.5 bg-red-600 text-white hover:bg-red-600/80"
          type="button"
        >
          Chiudi
        </button>
      </div>
      }
      <!-- -->
      @if (posts$ | async; as posts) {
      <div class="postList-container flex flex-col w-full">
        @for (post of posts; track post.id) {
        <div class="post-container">
          @if(currentView === 'upgrade') {
          <app-post-upgrade
            [post]="post"
            [user]="post.user"
            (openPostDetailCallback)="openPostDetail($event)"
          />
          } @else {
          <app-post-base [post]="post" />
          }
        </div>
        }
      </div>
      }
    </div>
  `,
  styles: [
    `
      .postDetail-container {
        border-radius: 4px;
        background-color: #ffff;
        border-width: 0;
        border-style: solid;
        border-color: #ffff;
        box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
          0px 1px 1px 0px rgba(0, 0, 0, 0.14),
          0px 1px 3px 0px rgba(0, 0, 0, 0.12);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  #httpClient = inject(HttpClient);
  #destroyRef = inject(DestroyRef);

  #url = 'https://jsonplaceholder.typicode.com';
  currentView: 'base' | 'upgrade' = 'base';

  postList$: Observable<Post[]> = this.#httpClient.get<Post[]>(
    `${this.#url}/posts`
  );
  userList$: Observable<User[]> = this.#httpClient.get<User[]>(
    `${this.#url}/users`
  );

  posts$ = combineLatest([this.postList$, this.userList$]).pipe(
    takeUntilDestroyed(this.#destroyRef),
    map(([postList, userList]) => {
      const posts = postList.map((post) => {
        const user = userList.find((user) => user.id === post.userId) || null;
        return {
          ...post,
          user,
        };
      });
      return posts;
    })
  );

  detail: {
    name: string;
    username: string;
    title: string;
    body: string;
  } | null = null;

  ngOnInit(): void {}

  switchView(view: 'base' | 'upgrade') {
    this.currentView = view;
  }

  openPostDetail(data: {
    name: string;
    username: string;
    title: string;
    body: string;
  }) {
    this.detail = data;
  }

  closeDetail() {
    this.detail = null;
  }
}
