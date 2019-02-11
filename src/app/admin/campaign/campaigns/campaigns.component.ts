import {Component, OnInit} from '@angular/core';
import {CampaignService} from "../../../service/campaign/campaign.service";
import {Campaign} from "admin/shared/campaign";

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
  campaigns: Array<Campaign>;
  selectedCampaigns: Array<Campaign> = [];
  name: string;
  invalid: boolean = false;

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
    this.campaignService.getCampaigns().subscribe(campaigns => {
      this.campaigns = campaigns;
    });
  }

  check(name: string) {
    this.invalid = !!this.campaigns && this.campaigns.filter(campaign => campaign.name === name).length > 0;
  }

  addName() {
    if (!this.invalid) {
      if (!!this.name) {
        this.campaignService.addCampaign(new Campaign(null, 0, this.name)).subscribe(campaign => {
          this.campaignService.getCampaigns().subscribe(campaigns => {
            this.campaigns = campaigns;
          });
        });
      }

      this.name = "";
    }
  }

  deleteNames(event: Event) {
    if (!!this.selectedCampaigns) {
      this.selectedCampaigns.forEach(campaign => this.campaignService.deleteCampaign(campaign.id).subscribe(campaign => {
        this.campaignService.getCampaigns().subscribe(campaigns => {
          this.campaigns = campaigns;
        });
      }));
    }

    this.selectedCampaigns = [];
  }
}
