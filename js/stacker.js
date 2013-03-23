!function ($) {
	var Stacker = function (element, options) {
		this.element = $(element);
		var hasOptions = typeof options == 'object';
		this.basePosition = this.element.position();
		this.activeItemIndex = 0;
		this.items = new Array();
		this.itemTemplate = '<div class="stack-item"></div>';
		this.content = $(this.element.children()[0]);
		this.nextCardNumber = 1;

		this.maxVisibleItems = 10;
		if (hasOptions && typeof options.maxVisibleItems == 'number') {
			this.maxVisibleItems = options.maxVisibleItems;
		}

		this.add();
	};

	Stacker.prototype = {
		constructor: Stacker,

		add: function () {
			var newItem = $(this.itemTemplate);
			this.activeItemIndex = this.items.length;
			newItem.attr('data-id', this.nextCardNumber);
			this.nextCardNumber++;
			this.items.push(newItem);
			this._draw();
		},

		remove: function () {
			this.items.splice(this.activeItemIndex, 1);
			if (this.activeItemIndex > 0)
				this.activeItemIndex--;
			if (this.items.length == 0)
				this.activeItemIndex = -1;
			this._draw();
		},

		previous: function () {
			if (this.activeItemIndex == this.items.length - 1) return;
			this.activeItemIndex++,
			this._draw();
		},

		next: function () {
			if (this.activeItemIndex == 0) return;
			this.activeItemIndex--;
			this._draw();
		},

		_draw: function () {
			this.element.empty();
			if (this.items.length == 0) return;

			var offset = 25;
			var itemsOnTop = this.items.length;
			if (this.items.length > this.maxVisibleItems) {
				itemsOnTop = this.maxVisibleItems;
			}
			if (this.activeItemIndex < this.maxVisibleItems)
				itemsOnTop = this.activeItemIndex + 1;

			var itemsBeneath = this.activeItemIndex;
			if (itemsBeneath > this.maxVisibleItems - 1)
				itemsBeneath = this.maxVisibleItems - 1;
			var bottomIndex = this.activeItemIndex - itemsBeneath;

			this.content.animate({ opacity: 0 }, 0);
			this.content.hide();
			for (var i = bottomIndex; i <= this.activeItemIndex; i++) {
				var index = i - bottomIndex;
				var item = this.items[i];
				item.css('position', 'absolute');
				item.css('zIndex', index);

				var id = item.data('id');
				item.html('<span class="stack-index">' + id + '</span>');

				this.element.prepend(item);

				var top = this.basePosition.top + offset * (itemsOnTop - index - 1);
				var left = this.basePosition.left + offset * (itemsOnTop - index - 1);

				item.animate({
					top: top + "px",
					left: left + "px"
				}, 100);

				item.on('click', { item: item }, $.proxy(this._setActiveItem, this));
			}

			this.content.css('position', 'absolute');
			this.content.css('zIndex', this.maxVisibleItems);
			this.element.prepend(this.content);

			this.content.show();
			this.content.animate({ opacity: 1 }, 250);

			this._triggerActiveItemChanged();
		},

		_setActiveItem: function (e) {
			var index = this.items.indexOf(e.data.item);
			if (this.activeItemIndex == index) return;
			this.activeItemIndex = index;
			this._draw();
		},

		_triggerActiveItemChanged: function () {
			var item = this.items[this.activeItemIndex];
			this.element.trigger({
				type: 'activeItemChanged',
				count: this.items.length,
				activeItemIndex: this.activeItemIndex,
				id: item ? item.data('id') : -1,
				container: this.content
			});
		}
	};

	$.fn.stacker = function (option) {
		var args = Array.apply(null, arguments);
		args.shift();
		return this.each(function () {
			var $this = $(this),
				data = $this.data('stacker'),
				options = typeof option == 'object' && option;

			if (!data) {
				$this.data('stacker', new Stacker(this, $.extend({}, $.fn.stacker().defaults, options)));
			}
			if (typeof option == 'string' && typeof data[option] == 'function') {
				data[option].apply(data, args);
			}
		});
	};

	$.fn.stacker.defaults = {};

	$.fn.stacker.constructor = Stacker;
} (window.jQuery);