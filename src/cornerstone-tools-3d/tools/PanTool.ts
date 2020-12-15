import { BaseTool } from './base/index';
// ~~ VTK Viewport
import { getEnabledElement } from './../../index';

export default class PanTool extends BaseTool {
  touchDragCallback: Function;
  mouseDragCallback: Function;

  constructor(toolConfiguration = {}) {
    const defaultToolConfiguration = {
      name: 'Pan',
      supportedInteractionTypes: ['Mouse', 'Touch'],
    };

    super(toolConfiguration, defaultToolConfiguration);

    /**
     * Will only fire fore cornerstone events:
     * - TOUCH_DRAG
     * - MOUSE_DRAG
     *
     * Given that the tool is active and has matching bindings for the
     * underlying touch/mouse event.
     */
    this.touchDragCallback = this._dragCallback.bind(this);
    this.mouseDragCallback = this._dragCallback.bind(this);
  }

  preMouseDownCallback(evt) {
    evt.preventDefault();
  }

  // Takes ICornerstoneEvent, Mouse or Touch
  _dragCallback(evt) {
    const { element: canvas, deltaPoints } = evt.detail;
    const enabledElement = getEnabledElement(canvas);

    const { x: deltaX, y: deltaY, z: deltaZ } = deltaPoints.world;
    const camera = enabledElement.viewport.getCamera();
    const { focalPoint, position } = camera;

    const updatedPosition = [
      position[0] - deltaX,
      position[1] - deltaY,
      position[2] - deltaZ,
    ];

    const updatedFocalPoint = [
      focalPoint[0] - deltaX,
      focalPoint[1] - deltaY,
      focalPoint[2] - deltaZ,
    ];

    enabledElement.viewport.setCamera({
      focalPoint: updatedFocalPoint,
      position: updatedPosition,
    });
    enabledElement.viewport.render();
  }
}