import { fabric } from 'fabric';
import { CanvasObjectType } from '@/store/drawn_object_store';
import { uuid } from '.';
export const LabeledRect = fabric.util.createClass(fabric.Rect, {
  type: 'labeledRect',
  // initialize can be of type function(options) or function(property, options), like for text.
  // no other signatures allowed.
  initialize: function (options) {
    options || (options = {});

    this.callSuper('initialize', options);
    this.set('label', options.label || '');
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      label: this.get('label'),
    });
  },

  _render: function (ctx) {
    this.callSuper('_render', ctx);

    ctx.font = '20px Helvetica';
    ctx.fillStyle = '#333';
    ctx.fillText(this.label, -this.width / 2, -this.height / 2 + 20);
  },
});

export const Frame = fabric.util.createClass(fabric.Rect, {
  type: 'frame',
  text: null,

  recalcTextPosition: function () {
    let left = this.left;
    let top = this.top;
    let width = this.width;

    this.text.set({
      left: left,
      top: top - 20,
      width: width,
    });
    this.text.setCoords();
  },

  initialize: function (rectOpt: fabric.IRectOptions & { [key: string]: any }) {
    this.callSuper('initialize', {
      ...rectOpt,
      stroke: '#ddd',
      fill: 'white',
    } as fabric.IRectOptions);

    this.text = new fabric.Textbox(rectOpt.frameLabel, {
      hasControls: false,
      hasBorders: false,

      fontSize: 16,
      left: rectOpt.left || 0,
      top: (rectOpt.top || 20) - 20 || 0,
      width: rectOpt.width,
      lockMovementX: true,
      lockMovementY: true,
    } as fabric.ITextboxOptions);

    this.text.set({
      frameId: this.id,
    });

    this.on('moving', () => {
      this.recalcTextPosition();
    });
    this.on('rotating', () => {
      this.recalcTextPosition();
    });
    this.on('scaling', () => {
      this.recalcTextPosition();
    });
    this.on('added', () => {
      // this.canvas.add(this.text);
    });
    this.on('removed', () => {
      this.canvas.remove(this.text);
    });
  },
});
