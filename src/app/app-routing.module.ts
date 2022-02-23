// import { LayoutAccountManagerComponent } from './_layout/layout-account-manager/layout-account-manager.component';
// import { AccountManagerProfileComponent } from './_accountManager/account-manager-profile/account-manager-profile.component';
// import { AccountManagerLocationComponent } from './_accountManager/account-manager-location/account-manager-location.component';
// import { AccountManagerPasswordComponent } from './_accountManager/account-manager-password/account-manager-password.component';
// import { ResetPasswordComponent } from './_account/reset-password/reset-password.component';
// import { ForgotPasswordComponent } from './_account/forgot-password/forgot-password.component';
// import { ForgotPasswordConfirmationComponent } from './_account/forgot-password-confirmation/forgot-password-confirmation.component';
// import { ResetPasswordConfirmationComponent } from './_account/reset-password-confirmation/reset-password-confirmation.component';
// import { AccountManagerAvatarComponent } from './_accountManager/account-manager-avatar/account-manager-avatar.component';
// import { ObservationManagePhotosComponent } from './_photos/observation-manage-photos/observation-manage-photos.component';
// import { TweetArchiveComponent } from './_tweet/tweet-archive/tweet-archive.component';

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccountRegistrationComponent } from "./_account/account-registration/account-registration.component";
import { ConfirmEmailSuccessComponent } from "./_account/confirm-email-success/confirm-email-success.component";
import { ConfirmEmailComponent } from "./_account/confirm-email/confirm-email.component";
import { AuthenticationGuardService } from "./_auth/authentication-guard.service";
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
// import { LayoutAccountManagerComponent } from "./_layout/layout-account-manager/layout-account-manager.component";
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
import { ObservationFeedComponent } from "./_observationFeed/observation-feed/observation-feed.component";
import { TweetDayArchiveComponent } from "./_tweet/tweet-day-archive/tweet-day-archive.component";
import { UserProfileComponent } from "./_user/user-profile/user-profile.component";

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
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'confirm-email', component: ConfirmEmailComponent },
      { path: 'confirmed-email', component: ConfirmEmailSuccessComponent },
      { path: 'account/registration', component: AccountRegistrationComponent },
      // { path: 'forgot-password', component: ForgotPasswordComponent },
      // { path: 'forgot-password-confirmation', component: ForgotPasswordConfirmationComponent },
      // { path: 'reset-password/:code', component: ResetPasswordComponent },
      // { path: 'reset-password-confirmation', component: ResetPasswordConfirmationComponent },
      { path: 'tweet/archive', component: TweetDayArchiveComponent },
      { path: 'about/developer', component: DeveloperComponent },
      { path: 'about/future', component: FutureComponent }
    ]
  },
  // ToDo: try moving this to the top so components load first with the sidebar if appropriate
  {
    path: '',
    component: LayoutSidebarComponent,
    canActivate: [AuthenticationGuardService],
    children: [
      {
        path: '',
        canActivateChild: [AuthenticationGuardService],
        children: [
          { path: '', component: HomeComponent, pathMatch: 'full' },
          { path: 'observation-feed', component: ObservationFeedComponent },
          { path: 'observation/detail/:id', component: ObservationReadComponent },
          { path: 'observation/delete/:id', component: ObservationDeleteComponent },
          { path: 'observation/create', component: ObservationCreateComponent, },
          { path: 'observation/update/:id', component: ObservationUpdateComponent },
          // { path: 'observation/photos/:id', component: ObservationManagePhotosComponent },
          { path: 'bird/index', component: BirdIndexComponent },
          { path: 'bird/detail/:id', component: BirdDetailComponent },
          { path: 'lists/life/:username', component: LifeListComponent },
          { path: 'user/:username', component: UserProfileComponent },
          { path: 'followers/:username', component: FollowersComponent },
          { path: 'following/:username', component: FollowingComponent },
          { path: 'network', component: NetworkComponent },
          { path: 'logout', component: LogoutComponent },
        ]
      },
    ]
  },
  // {
  //   path: '',
  //   component: LayoutAccountManagerComponent,
  //   canActivate: [AuthenticationGuardService],
  //   children: [
  //     {
  //       path: '',
  //       canActivateChild: [AuthenticationGuardService],
  //       children: [
  //         { path: '', component: HomeComponent, pathMatch: 'full' },
  //         //         { path: 'account-manager-profile', component: AccountManagerProfileComponent },
  //         //         { path: 'account-manager-avatar', component: AccountManagerAvatarComponent },
  //         //         { path: 'account-manager-location', component: AccountManagerLocationComponent },
  //         //         { path: 'account-manager-password', component: AccountManagerPasswordComponent },
  //       ]
  //     },
  //   ]
  // },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
