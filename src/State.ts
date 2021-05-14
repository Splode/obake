export default class State {
  public setIsRunning(running: boolean): void {
    this._isRunning = running;
  }

  public get isRunning(): boolean {
    return this._isRunning;
  }

  private _isRunning = false;
}
