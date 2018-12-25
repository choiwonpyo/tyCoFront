import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-typing-main-skeleton',
  templateUrl: './typing-main-skeleton.component.html',
  styleUrls: ['./typing-main-skeleton.component.css']
})
export class TypingMainSkeletonComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }
  goToBase() {
    this.router.navigate(['./base'], {relativeTo: this.activatedRoute});
  }
  goToWord() {
    this.router.navigate(['./word'], {relativeTo: this.activatedRoute});
  }
  goToParagraph() {
    this.router.navigate(['./paragraph'], {relativeTo: this.activatedRoute});
  }
}
