import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Comment } from 'src/app/models/comment/Comment'
import { UserProfile } from 'src/app/models/profile/Profile'
import { ProfileService } from 'src/app/services/profile.service'
import { Entities } from 'src/app/utils/Entities'

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  username: string
  user: UserProfile | null
  
  constructor (
    private service: ProfileService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.username = this.route.snapshot.paramMap.get('username')
    this.user = await this.service.getByUsername(this.username).toPromise()
    console.log(this.user)
  }
}
