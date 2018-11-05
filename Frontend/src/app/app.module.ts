//core angular modules
import { NgModule } from '@angular/core';
import { HttpClientModule }   from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//angular materials modules
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSliderModule} from '@angular/material/slider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { NouisliderModule } from 'ng2-nouislider/src/ng2-nouislider';
//for Ngrx/store
import {StoreModule} from 'ngrx/@ngrx/store';
import { reducer } from './Reducers/answer.reducer';
//Interceptor for writting token in header of requests(not for Login/Register requests!)
import { AuthenticationInterceptor } from './Interceptors/Authorization.interceptor';
//my own components
import { AppComponent} from './app.component';
import {BottomLabel_Component} from './Components/doc-editor-component/Entries/BottomLabel_Component_Folder/BottomLabel_Component';
import {Content_Component} from './Components/doc-editor-component/Entries/Content_Component_Folder/Content_Component';
import {Menu,TextEditor,Social, Share_Dialog,Version_Dialog, Save_Dialog, Update_Component} from './Components/doc-editor-component/Entries/Tools_Component_Folder/Entry_Components/exports';
import {Tools_Component} from './Components/doc-editor-component/Entries/Tools_Component_Folder/Tools_Component';
import { DocEditorComponent } from './Components/doc-editor-component/doc-editor.component';
import { CRUD_UI_Component } from './Components/crud-ui-component/crud-ui.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { RegisterComponent } from './Components/register/register.component';
//services
import {HttpService} from './AppServices/http.services';
import {TextEditingService} from './AppServices/TextEditing.services';
import {IndentService} from './AppServices/indent.serivces';
import {PaddingService} from './AppServices/padding.services';
import {DocumentService} from './AppServices/document.service';
//directives
//
import {Routes, RouterModule} from '@angular/router';
import { SignInComponent } from './Components/sign-in/sign-in.component';

const signInRoutes: Routes = [
  {path:'Log_In', component:LogInComponent},
  {path:'Register', component:RegisterComponent},
];
const appRoutes: Routes =[
  { path:'Sign_In', component:SignInComponent,children:signInRoutes},
  { path: 'CRUD_UI', component: CRUD_UI_Component},
  { path: 'Doc_editor', component:DocEditorComponent},
];

@NgModule({
  declarations: 
  [
    AppComponent,
//my own components
    //entries of Register component
    Tools_Component,
    //entries of tools component
      Menu,
      //entries of menu component
        Save_Dialog,
        Version_Dialog,
        Update_Component,
      TextEditor,
      //entries of TextEditor component
      Social,
      //entries of Social component
        Share_Dialog,
    Content_Component,
    //entries of Content component
    BottomLabel_Component,
    //entries of BottomLabel component
    CRUD_UI_Component,
    DocEditorComponent,
    SignInComponent,
    LogInComponent,
    RegisterComponent,
//directives
  ],
  entryComponents:
  [

    Tools_Component,
      Menu,
        Save_Dialog,
        Version_Dialog,
        Update_Component,
      TextEditor,
      Social,
        Share_Dialog,
    Content_Component,
    BottomLabel_Component,
  ],
  imports: 
  [
//core angular modules
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
//angular materials modules
    MatCardModule,
    MatMenuModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatGridListModule,
    MatSliderModule,
    MatProgressSpinnerModule,

    NouisliderModule,
//ngrx/store module
    StoreModule.provideStore({answer:reducer}),
//
    RouterModule.forRoot(appRoutes)
  ],
  exports:
  [
  ],
  providers:
  [
    //for Authorization.interceptor.ts
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
    //services
    HttpService,
    TextEditingService,
    IndentService,
    PaddingService,
    DocumentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
