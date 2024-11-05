import { Page } from './Page';
import { UserController } from '../controllers/UserController';

export class UserProfilePage extends Page {
  private userController: UserController;

  constructor(containerId: string) {
    super(containerId);
    this.userController = new UserController();
  }

  async render(): Promise<void> {
    this.container.innerHTML = `
      <app-header></app-header>
      <div class="container mx-auto px-4 pt-24">
        <h1 class="text-3xl font-bold mb-8">Your Profile</h1>
        <div id="user-info" class="grid gap-4">
          <div class="profile-section">
            <h2 class="text-xl mb-4">Personal Information</h2>
            <div id="user-details"></div>
          </div>
        </div>
      </div>
    `;
  }
}