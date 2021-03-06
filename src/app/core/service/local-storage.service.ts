import { Profile } from '../../core/redux/user/user.state';
import { Injectable } from '@angular/core';

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';
const PROFILE_KEY = 'profile';

/**
 * Handles local storage interaction
 */
@Injectable()
export class LocalStorageService {
  /**
   * Get authorisation id token
   */
  public getIdToken(): string {
    return this.getItem(ID_TOKEN_KEY);
  }

  /**
   * Sets authorisation id token
   */
  public setIdToken(value: string): void {
    this.setItem(ID_TOKEN_KEY, value);
  }

  /**
   * Remove authorisation id token
   */
  public removeIdToken(): void {
    this.removeItem(ID_TOKEN_KEY);
  }

  /**
   * Get authorisation access token
   */
  public getAccessToken(): string {
    return this.getItem(ACCESS_TOKEN_KEY);
  }

  /**
   * Sets authorisation access token
   */
  public setAccessToken(value: string): void {
    this.setItem(ACCESS_TOKEN_KEY, value);
  }

  /**
   * Remove authorisation id token
   */
  public removeAccessToken(): void {
    this.removeItem(ACCESS_TOKEN_KEY);
  }

  /**
   * Get user profile
   */
  public getProfile(): Profile {
    return JSON.parse(this.getItem(PROFILE_KEY));
  }

  /**
   * Remove profile
   */
  public removeProfile(): void {
    this.removeItem(PROFILE_KEY);
  }

  /**
   * Sets user profile
   */
  public setProfile(value: Profile): void {
    this.setItem(PROFILE_KEY, JSON.stringify(value));
  }

  private getItem(name: string): string {
    return localStorage.getItem(name);
  }

  private removeItem(name: string): void {
    localStorage.removeItem(name);
  }

  private setItem(name: string, value: string): void {
    localStorage.setItem(name, value);
  }
}
