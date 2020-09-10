import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  //Variable Declaration
  public showLoader: boolean = true;
  public smallLeftBar: boolean = false;
  public smallLeftBarClass: string = "";
  public darkLayout:boolean = false;
  public settingsVisible: boolean = false;
  public rightSidebarVisible: boolean = true;
  public searchVisible: boolean = false;
  public currentTheme:string = "theme-blush";
  private ngUnsubscribe = new Subject();

  constructor(private layoutService: LayoutService, private router: Router) {
    this.router.events.pipe(takeUntil(this.ngUnsubscribe)).subscribe((event) => {
        if (event instanceof NavigationEnd){
            this.showLoader = false;
        }
    });

    this.layoutService.smallLeftBarShow.pipe(takeUntil(this.ngUnsubscribe)).subscribe(leftBarStatus => {
        this.smallLeftBar = leftBarStatus;
        
        if(this.smallLeftBar){
          this.smallLeftBarClass = "ls-toggle-menu";
        } else {
          this.smallLeftBarClass = "";
        }
        console.log(this.smallLeftBarClass);
    });

    this.layoutService.settingsShow.pipe(takeUntil(this.ngUnsubscribe)).subscribe(value => {
      this.settingsVisible = value;
    });

    this.layoutService.darkLayoutShow.pipe(takeUntil(this.ngUnsubscribe)).subscribe(value => {
      this.darkLayout = value;
    });

    this.layoutService.rightSidebarShow.pipe(takeUntil(this.ngUnsubscribe)).subscribe(value => {
      this.rightSidebarVisible = value;
    });

    this.layoutService.searchShow.pipe(takeUntil(this.ngUnsubscribe)).subscribe(value => {
      this.searchVisible = value;
    });

    this.layoutService.themeChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(value => {
      this.currentTheme = value;
    });
  }

  ngOnInit() {
  }

  onActivate(event) {
    const scrollToTop = window.setInterval(() => {
        const pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
}

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  toggleSetting(){
    this.layoutService.toggleSettings();
  }

  hideSearch(){
    this.layoutService.hideSearch();
  }

}
