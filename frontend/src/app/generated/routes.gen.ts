
import { Routes } from '@angular/router'

export const generatedRoutes: Routes = [
  {
    path: 'createarticle',
    loadComponent: () =>
      import('../features/createarticle/createarticle.component')
        .then(m => m.CreateArticleComponent)
  },
  {
    path: 'createarticlecomment',
    loadComponent: () =>
      import('../features/createarticlecomment/createarticlecomment.component')
        .then(m => m.CreateArticleCommentComponent)
  },
  {
    path: 'createarticlefavorite',
    loadComponent: () =>
      import('../features/createarticlefavorite/createarticlefavorite.component')
        .then(m => m.CreateArticleFavoriteComponent)
  },
  {
    path: 'createuser',
    loadComponent: () =>
      import('../features/createuser/createuser.component')
        .then(m => m.CreateUserComponent)
  },
  {
    path: 'deletearticle',
    loadComponent: () =>
      import('../features/deletearticle/deletearticle.component')
        .then(m => m.DeleteArticleComponent)
  },
  {
    path: 'deletearticlecomment',
    loadComponent: () =>
      import('../features/deletearticlecomment/deletearticlecomment.component')
        .then(m => m.DeleteArticleCommentComponent)
  },
  {
    path: 'deletearticlefavorite',
    loadComponent: () =>
      import('../features/deletearticlefavorite/deletearticlefavorite.component')
        .then(m => m.DeleteArticleFavoriteComponent)
  },
  {
    path: 'followuserbyusername',
    loadComponent: () =>
      import('../features/followuserbyusername/followuserbyusername.component')
        .then(m => m.FollowUserByUsernameComponent)
  },
  {
    path: 'getarticle',
    loadComponent: () =>
      import('../features/getarticle/getarticle.component')
        .then(m => m.GetArticleComponent)
  },
  {
    path: 'getarticlecomments',
    loadComponent: () =>
      import('../features/getarticlecomments/getarticlecomments.component')
        .then(m => m.GetArticleCommentsComponent)
  },
  {
    path: 'getarticles',
    loadComponent: () =>
      import('../features/getarticles/getarticles.component')
        .then(m => m.GetArticlesComponent)
  },
  {
    path: 'getarticlesfeed',
    loadComponent: () =>
      import('../features/getarticlesfeed/getarticlesfeed.component')
        .then(m => m.GetArticlesFeedComponent)
  },
  {
    path: 'getcurrentuser',
    loadComponent: () =>
      import('../features/getcurrentuser/getcurrentuser.component')
        .then(m => m.GetCurrentUserComponent)
  },
  {
    path: 'getprofilebyusername',
    loadComponent: () =>
      import('../features/getprofilebyusername/getprofilebyusername.component')
        .then(m => m.GetProfileByUsernameComponent)
  },
  {
    path: 'gettags',
    loadComponent: () =>
      import('../features/gettags/gettags.component')
        .then(m => m.GetTagsComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../features/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: 'unfollowuserbyusername',
    loadComponent: () =>
      import('../features/unfollowuserbyusername/unfollowuserbyusername.component')
        .then(m => m.UnfollowUserByUsernameComponent)
  },
  {
    path: 'updatearticle',
    loadComponent: () =>
      import('../features/updatearticle/updatearticle.component')
        .then(m => m.UpdateArticleComponent)
  },
  {
    path: 'updatecurrentuser',
    loadComponent: () =>
      import('../features/updatecurrentuser/updatecurrentuser.component')
        .then(m => m.UpdateCurrentUserComponent)
  }
]
