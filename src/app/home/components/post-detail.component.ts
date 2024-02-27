import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [],
  template: `
    <div class="post flex flex-col w-full">
      <p class="text-xs px-2">
        Pubblicato da:
        <span class="text-[#ff0000] underline underline-offset-1 text-xs">{{
          detail.username
        }}</span>
      </p>
      <div class="w-full flex flex-col p-2">
        <div class="post-title">
          <h1 class="text-3xl font-bold text-[#ff0000]">{{ detail.title }}</h1>
        </div>
        <div class="post-body">
          <p class="text-base">{{ detail.body }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailComponent implements OnInit {
  @Input({ required: true }) detail!: {
    name: string;
    username: string;
    title: string;
    body: string;
  };

  ngOnInit(): void {}
}
