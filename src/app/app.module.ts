import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { FormsModule } from '@angular/forms';
import { InlineChartComponent } from './inline-chart/inline-chart.component';
import { MonthlyGraphComponent } from './monthly-graph/monthly-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    InlineChartComponent,
    MonthlyGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
