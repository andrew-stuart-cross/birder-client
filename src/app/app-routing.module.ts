import { inject, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccountRegistrationComponent } from "./_account/account-registration/account-registration.component";
import { ConfirmEmailSuccessComponent } from "./_account/confirm-email-success/confirm-email-success.component";
import { ConfirmEmailComponent } from "./_account/confirm-email/confirm-email.component";
import { ForgotPasswordComponent } from "./_account/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./_account/reset-password/reset-password.component";
import { AccountManagerComponent } from "./_account/account-manager/account-manager.component";
import { LoginComponent } from "./_auth/login/login.component";
import { LogoutComponent } from "./_auth/logout/logout.component";
import { BirdDetailComponent } from "./_bird/bird-detail/bird-detail.component";
import { BirdIndexComponent } from "./_bird/bird-index/bird-index.component";
import { AboutComponent } from "./_home/about/about.component";
import { ContactComponent } from "./_home/contact/contact.component";
import { DeveloperComponent } from "./_home/developer/developer.component";
import { FutureComponent } from "./_home/future/future.component";
import { HomeComponent } from "./_home/home/home.component";
import { TechnologyComponent } from "./_home/technology/technology.component";
import { LayoutNoSidebarComponent } from "./_layout/layout-no-sidebar/layout-no-sidebar.component";
import { LayoutSidebarComponent } from "./_layout/layout-sidebar/layout-sidebar.component";
import { LifeListComponent } from "./_list/life-list/life-list.component";
import { FollowersComponent } from "./_network/followers/followers.component";
import { FollowingComponent } from "./_network/following/following.component";
import { NetworkComponent } from "./_network/network/network.component";
import { ObservationCreateComponent } from "./_observation/observation-create/observation-create.component";
import { ObservationDeleteComponent } from "./_observation/observation-delete/observation-delete.component";
import { ObservationReadComponent } from "./_observation/observation-read/observation-read.component";
import { ObservationUpdateComponent } from "./_observation/observation-update/observation-update.component";
import { TweetDayArchiveComponent } from "./_tweet/tweet-day-archive/tweet-day-archive.component";
import { UserProfileComponent } from "./_user/user-profile/user-profile.component";
import { ObservationFeedComponent } from "./_observation-feed/observation-feed/observation-feed.component";
import { AuthenticationService } from "./_auth/authentication.service";

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: '',
    component: LayoutNoSidebarComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'home', component: HomeComponent, pathMatch: 'full' },
      { path: 'about/about', component: AboutComponent },
      { path: 'about/contact', component: ContactComponent },
      { path: 'about/technology', component: TechnologyComponent },
      { path: 'about/developer', component: DeveloperComponent },
      { path: 'about/future', component: FutureComponent },
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'confirm-email', component: ConfirmEmailComponent },
      { path: 'confirmed-email', component: ConfirmEmailSuccessComponent },
      { path: 'account/registration', component: AccountRegistrationComponent },
      { path: 'account/manage', component: AccountManagerComponent },
      // change routing 'account/password...'
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password/:code', component: ResetPasswordComponent }
    ]
  },
  // ToDo: try moving this to the top so components load first with the sidebar if appropriate
  {
    path: '',
    component: LayoutSidebarComponent,
    canActivate: [() => inject(AuthenticationService).isLoggedIn()],
    children: [
      {
        path: '',
        canActivateChild: [() => inject(AuthenticationService).isLoggedIn()],
        children: [
          { path: '', component: HomeComponent, pathMatch: 'full' },
          // Currently components are reused only when only route parameters change while staying on the same route.
          // If the route is changed, event when the new route adds the same component, the component is recreated.
          { path: 'feed-n/:filter', component: ObservationFeedComponent },
          { path: 'feed-p/:filter', component: ObservationFeedComponent },
          //
          { path: 'observation/detail/:id', component: ObservationReadComponent },
          { path: 'observation/delete/:id', component: ObservationDeleteComponent },
          { path: 'observation/create', component: ObservationCreateComponent, },
          { path: 'observation/update/:id', component: ObservationUpdateComponent },
          { path: 'bird/index', component: BirdIndexComponent },
          { path: 'bird/detail/:id', component: BirdDetailComponent },
          { path: 'lists/life/:username', component: LifeListComponent },
          { path: 'user/:username', component: UserProfileComponent },
          { path: 'followers/:username', component: FollowersComponent },
          { path: 'following/:username', component: FollowingComponent },
          { path: 'network', component: NetworkComponent },
          { path: 'logout', component: LogoutComponent },
          { path: 'tweet/archive', component: TweetDayArchiveComponent }
        ]
      },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //enableTracing: true,
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
