import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Campaign} from "admin/shared/campaign";

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  campaigns: Array<Campaign> = [];

  constructor(private http: HttpClient) {
    this.updateCache();
  }

  getCampaignsCache(): Array<Campaign> {
    return this.campaigns;
  }

  getCampaigns(): Observable<Array<Campaign>> {
    return this.http.get<Array<Campaign>>("http://localhost:8888/admin/campaigns");
  }

  getCampaign(campaignId: number): Observable<Campaign> {
    return this.http.get<Campaign>("http://localhost:8888/admin/campaigns/" + campaignId);
  }

  addCampaign(campaign: Campaign): Observable<Campaign> {
    setTimeout(this.updateCache, 500);

    return this.http.post<Campaign>("http://localhost:8888/admin/campaigns", campaign);
  }

  updateCampaign(campaign: Campaign): Observable<Campaign> {
    setTimeout(this.updateCache, 500);

    return this.http.put<Campaign>("http://localhost:8888/admin/campaigns", campaign);
  }

  deleteCampaign(campaignId: number): Observable<Campaign> {
    setTimeout(this.updateCache, 500);

    return this.http.delete<Campaign>("http://localhost:8888/admin/campaigns/" + campaignId);
  }

  isUnique(campaign: Campaign, fieldName: String, value: String) {
    this.getCampaigns().subscribe(campaigns => this.campaigns = campaigns);

    if (!!this.campaigns) {
      for (let campaignKey in this.campaigns) {
        if (this.campaigns[campaignKey].id != campaign.id &&
            ((fieldName === "name" && this.campaigns[campaignKey].name === value))) {
          return false;
        }
      }
    }

    return true;
  }

  updateCache() {
    if (!!this.getCampaigns) {
      this.getCampaigns().subscribe(campaigns => this.campaigns = campaigns);
    }
  }
}
