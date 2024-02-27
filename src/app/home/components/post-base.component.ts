import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-post-base',
  standalone: true,
  imports: [],
  template: `
    <div class="post flex flex-row justify-between w-full items-center">
      <div class="w-1/6 flex justify-center">
        <div class="img-container rounded bg-red-500"></div>
      </div>
      <div class="w-5/6 flex flex-col p-2">
        <div class="post-title">
          <h1 class="text-3xl font-bold">{{ post.title }}</h1>
        </div>
        <div class="post-body">
          <p class="text-base">{{ post.body }}</p>
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
export class PostBaseComponent implements OnInit {
  @Input({ required: true }) post!: Post;

  ngOnInit(): void {}
}
