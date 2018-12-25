import {ComponentsManager, Map} from '../component';

export abstract class StageCore {
  _map: Map;
  _componentManager: ComponentsManager;
  _characterId = -1;

  constructor(map: Map, componentManager: ComponentsManager) {
    this._map = map;
    this._componentManager = componentManager;
  }
  get map() {
    return this._map;
  }
  get componentsManager() {
    return this._componentManager;
  }
  set characterId(value: number) {
    this._characterId = value;
  }
  get characterId() {
    return this._characterId;
  }

}
