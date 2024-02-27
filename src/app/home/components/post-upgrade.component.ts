import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-post-upgrade',
  standalone: true,
  imports: [],
  template: `
    <div class="post flex flex-row justify-between w-full items-center">
      <div class="w-1/6 flex justify-center p-2">
        <div
          class="img-container rounded bg-red-500 uppercase flex items-center justify-center cursor-pointer"
          (click)="openDetail()"
        >
          <span class="text-[#ffffff] text-2xl">{{ initials }}</span>
        </div>
      </div>
      <div class="w-5/6 flex flex-col p-2">
        <div class="post-title">
          <h1 class="text-3xl font-bold text-[#ff0000]">{{ post.title }}</h1>
        </div>
        <div class="post-body py-3">
          <p class="text-xs">
            Pubblicato da:
            <span class="text-[#ff0000] underline underline-offset-1 text-xs">{{
              _user?.username
            }}</span>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .post {
        border-bottom: 1px solid #eeeeee;
      }
      .img-container {
        width: 50px;
        height: 50px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostUpgradeComponent implements OnInit {
  @Input({ required: true }) post!: Post;

  _user: User | null = null;
  @Input() set user(value: User | null) {
    if (value) {
      const nameAndSurname = value.name.split(' ');
      nameAndSurname.forEach((element) => {
        this.initials += element.charAt(0);
      });
      this._user = value;
    }
  }

  //la card mostra `user.name` e `user.username` dell'autore del post
  //la card mostra anche `post.title` e `post.body` del post.
  @Output() openPostDetailCallback = new EventEmitter<{
    name: string;
    username: string;
    title: string;
    body: string;
  }>();

  initials: string = '';

  ngOnInit(): void {}

  openDetail() {
    this.openPostDetailCallback.emit({
      name: this._user?.name || '',
      username: this._user?.username || '',
      title: this.post.title,
      body: this.post.body,
    });
    window.scrollTo(0, 0);
  }
}
