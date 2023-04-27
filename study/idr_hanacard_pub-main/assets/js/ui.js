/*** jquery.selectbox.js ***/

/*
 * jQuery selectBox - A cosmetic, styleable replacement for SELECT elements
 *
 * Licensed under the MIT license: http://opensource.org/licenses/MIT
 *
 * v1.2.0
 *
 * https://github.com/marcj/jquery-selectBox
 */
;(function ($) {

  /**
   * SelectBox class.
   *
   * @param {HTMLElement|jQuery} select If it's a jQuery object, we use the first element.
   * @param {Object}             options
   * @constructor
   */
  var SelectBox = this.SelectBox = function (select, options) {
    if (select instanceof jQuery) {
      if (select.length > 0) {
        select = select[0];
      } else {
        return;
      }
    }

    this.typeTimer     = null;
    this.typeSearch    = '';
    this.isMac         = navigator.platform.match(/mac/i);
    options            = 'object' === typeof options ? options :  {};
    this.selectElement = select;

    // Disable for iOS devices (their native controls are more suitable for a touch device)
    if (!options.mobile && navigator.userAgent.match(/iPad|iPhone|Android|IEMobile|BlackBerry/i)) {
      return false;
    }

    // Element must be a select control
    if ('select' !== select.tagName.toLowerCase()) {
      return false;
    }

    this.init(options);
  }

  /**
   * @type {String}
   */
  SelectBox.prototype.version = '1.2.0';

  /**
   * @param {Object} options
   *
   * @returns {Boolean}
   */
  SelectBox.prototype.init = function (options) {
    var select = $(this.selectElement);
    if (select.data('selectBox-control')) {
      return false;
    }

    var control    = $('<a class="selectBox" />')
      , inline   = select.attr('multiple') || parseInt(select.attr('size')) > 1
      , settings = options || {}
      , tabIndex = parseInt(select.prop('tabindex')) || 0
      , self     = this;

    control
      .width(select.outerWidth())
      .addClass(select.attr('class'))
      .attr('title', select.attr('title') || '')
      .attr('tabindex', tabIndex)
      //.css('display', 'inline-block')
      .css('display', 'none')   // 0807
      .bind('focus.selectBox', function () {
        if (this !== document.activeElement && document.body !== document.activeElement) {
          $(document.activeElement).blur();
        }
        if (control.hasClass('selectBox-active')) {
          return;
        }
        control.addClass('selectBox-active');
        select.trigger('focus');
      })
      .bind('blur.selectBox', function () {
        if (!control.hasClass('selectBox-active')) {
          return;
        }
        control.removeClass('selectBox-active');
        select.trigger('blur');
      });

    if (!$(window).data('selectBox-bindings')) {
      $(window)
        .data('selectBox-bindings', true)
        .bind('scroll.selectBox', this.hideMenus)
        .bind('resize.selectBox', this.hideMenus);
    }

    if (select.attr('disabled')) {
      control.addClass('selectBox-disabled');
    }

    // Focus on control when label is clicked
    select.bind('click.selectBox', function (event) {
      // control.focus();
      event.preventDefault();
    });

    // Generate control
    if (inline) {
      // Inline controls
      options = this.getOptions('inline');

      control
        .append(options)
        .data('selectBox-options', options).addClass('selectBox-inline selectBox-menuShowing')
        .bind('keydown.selectBox', function (event) {
          self.handleKeyDown(event);
        })
        .bind('keypress.selectBox',function (event) {
          self.handleKeyPress(event);
        })
        .bind('mousedown.selectBox',function (event) {
          if (1 !== event.which) {
            return;
          }
          if ($(event.target).is('A.selectBox-inline')) {
            event.preventDefault();
          }
          if (!control.hasClass('selectBox-focus')) {
            control.focus();
          }
        })
        .insertAfter(select);

      // Auto-height based on size attribute
      if (!select[0].style.height) {
        var size = select.attr('size') ? parseInt(select.attr('size')) : 5;
        // Draw a dummy control off-screen, measure, and remove it
        var tmp = control
          .clone()
          .removeAttr('id')
          .css({
            position: 'absolute',
            top: '-9999em'
          })
          .show()
          .appendTo('body');
        tmp.find('.selectBox-options').html('<li><a>\u00A0</a></li>');
        var optionHeight = parseInt(tmp.find('.selectBox-options A:first').html('&nbsp;').outerHeight());
        tmp.remove();
        control.height(optionHeight * size);
      }
      this.disableSelection(control);
    } else {
      // Dropdown controls
      var label = $('<span class="selectBox-label" />'),
        arrow = $('<span class="selectBox-arrow" />');

      // Update label
      label.attr('class', this.getLabelClass()).text(this.getLabelText());
      options = this.getOptions('dropdown');
      options.appendTo('BODY');

      control
        .data('selectBox-options', options)
        .addClass('selectBox-dropdown')
        .append(label)
        .append(arrow)
        .bind('mousedown.selectBox', function (event) {
          if (1 === event.which) {
            if (control.hasClass('selectBox-menuShowing')) {
              self.hideMenus();
            } else {
              event.stopPropagation();
              // Webkit fix to prevent premature selection of options
              options
                .data('selectBox-down-at-x', event.screenX)
                .data('selectBox-down-at-y', event.screenY);
              self.showMenu();
            }
          }
        })
        .bind('keydown.selectBox', function (event) {
          self.handleKeyDown(event);
        })
        .bind('keypress.selectBox', function (event) {
          self.handleKeyPress(event);
        })
        .bind('open.selectBox',function (event, triggerData) {
          if (triggerData && triggerData._selectBox === true) {
            return;
          }
          self.showMenu();
        })
        .bind('close.selectBox', function (event, triggerData) {
          if (triggerData && triggerData._selectBox === true) {
            return;
          }
          self.hideMenus();
        })
        .insertAfter(select);

      // Set label width
      var labelWidth =
        control.width()
        - arrow.outerWidth()
        - parseInt(label.css('paddingLeft')) || 0
        - parseInt(label.css('paddingRight')) || 0;

      label.width(labelWidth);
      this.disableSelection(control);
    }
    // Store data for later use and show the control
    select
      .addClass('selectBox')
      .data('selectBox-control', control)
      .data('selectBox-settings', settings)
      .show();  //0807
    //.hide();  0807
  };

  /**
   * @param {String} type 'inline'|'dropdown'
   * @returns {jQuery}
   */
  SelectBox.prototype.getOptions = function (type) {
    var options;
    var select = $(this.selectElement);
    var self   = this;
    // Private function to handle recursion in the getOptions function.
    var _getOptions = function (select, options) {
      // Loop through the set in order of element children.
      select.children('OPTION, OPTGROUP').each(function () {
        // If the element is an option, add it to the list.
        if ($(this).is('OPTION')) {
          // Check for a value in the option found.
          if ($(this).length > 0) {
            // Create an option form the found element.
            self.generateOptions($(this), options);
          } else {
            // No option information found, so add an empty.
            options.append('<li>\u00A0</li>');
          }
        } else {
          // If the element is an option group, add the group and call this function on it.
          var optgroup = $('<li class="selectBox-optgroup" />');
          optgroup.text($(this).attr('label'));
          options.append(optgroup);
          options = _getOptions($(this), options);
        }
      });
      // Return the built strin
      return options;
    };

    switch (type) {
      case 'inline':
        options = $('<ul class="selectBox-options" />');
        options = _getOptions(select, options);
        options
          .find('A')
          .bind('mouseover.selectBox', function (event) {
            self.addHover($(this).parent());
          })
          .bind('mouseout.selectBox',function (event) {
            self.removeHover($(this).parent());
          })
          .bind('mousedown.selectBox',function (event) {
            if (1 !== event.which) {
              return
            }
            event.preventDefault(); // Prevent options from being "dragged"
            if (!select.selectBox('control').hasClass('selectBox-active')) {
              select.selectBox('control').focus();
            }
          })
          .bind('mouseup.selectBox', function (event) {
            if (1 !== event.which) {
              return;
            }
            self.hideMenus();
            self.selectOption($(this).parent(), event);
          });

        this.disableSelection(options);
        return options;
      case 'dropdown':
        options = $('<ul class="selectBox-dropdown-menu selectBox-options" />');
        options = _getOptions(select, options);

        options
          .data('selectBox-select', select)
          .css('display', 'none')
          .appendTo('BODY')
          .find('A')
          .bind('mousedown.selectBox', function (event) {
            if (event.which === 1) {
              event.preventDefault(); // Prevent options from being "dragged"
              if (event.screenX === options.data('selectBox-down-at-x') &&
                event.screenY === options.data('selectBox-down-at-y')) {
                options.removeData('selectBox-down-at-x').removeData('selectBox-down-at-y');
                self.hideMenus();
              }
            }
          })
          .bind('mouseup.selectBox', function (event) {
            if (1 !== event.which) {
              return;
            }
            if (event.screenX === options.data('selectBox-down-at-x') &&
              event.screenY === options.data('selectBox-down-at-y')) {
              return;
            } else {
              options.removeData('selectBox-down-at-x').removeData('selectBox-down-at-y');
            }
            self.selectOption($(this).parent());
            self.hideMenus();
          })
          .bind('mouseover.selectBox', function (event) {
            self.addHover($(this).parent());
          })
          .bind('mouseout.selectBox', function (event) {
            self.removeHover($(this).parent());
          });

        // Inherit classes for dropdown menu
        var classes = select.attr('class') || '';
        if ('' !== classes) {
          classes = classes.split(' ');
          for (var i in classes) {
            options.addClass(classes[i] + '-selectBox-dropdown-menu');
          }
        }
        this.disableSelection(options);
        return options;
    }
  };

  /**
   * Returns the current class of the selected option.
   *
   * @returns {String}
   */
  SelectBox.prototype.getLabelClass = function () {
    var selected = $(this.selectElement).find('OPTION:selected');
    return ('selectBox-label ' + (selected.attr('class') || '')).replace(/\s+$/, '');
  };

  /**
   * Returns the current label of the selected option.
   *
   * @returns {String}
   */
  SelectBox.prototype.getLabelText = function () {
    var selected = $(this.selectElement).find('OPTION:selected');
    return selected.text() || '\u00A0';
  };

  /**
   * Sets the label.
   * This method uses the getLabelClass() and getLabelText() methods.
   */
  SelectBox.prototype.setLabel = function () {
    var select = $(this.selectElement);
    var control = select.data('selectBox-control');
    if (!control) {
      return;
    }

    control
      .find('.selectBox-label')
      .attr('class', this.getLabelClass())
      .text(this.getLabelText());
  };

  /**
   * Destroys the SelectBox instance and shows the origin select element.
   *
   */
  SelectBox.prototype.destroy = function () {
    var select = $(this.selectElement);
    var control = select.data('selectBox-control');
    if (!control) {
      return;
    }

    var options = control.data('selectBox-options');
    options.remove();
    control.remove();
    select
      .removeClass('selectBox')
      .removeData('selectBox-control')
      .data('selectBox-control', null)
      .removeData('selectBox-settings')
      .data('selectBox-settings', null)
      .hide();
    //.show(); 1704
  };

  /**
   * Refreshes the option elements.
   */
  SelectBox.prototype.refresh = function () {
    var select = $(this.selectElement),
      control = select.data('selectBox-control'),
      dropdown = control.hasClass('selectBox-dropdown'),
      menuOpened = control.hasClass('selectBox-menuShowing');
    select.selectBox('options', select.html());
    // Restore opened dropdown state (original menu was trashed)
    if (dropdown && menuOpened) {
      this.showMenu();
    }
  };

  /**
   * Shows the dropdown menu.
   */
  SelectBox.prototype.showMenu = function () {
    var self = this
      , select   = $(this.selectElement)
      , control  = select.data('selectBox-control')
      , settings = select.data('selectBox-settings')
      , options  = control.data('selectBox-options');

    if (control.hasClass('selectBox-disabled')) {
      return false;
    }

    this.hideMenus();
    var borderBottomWidth = parseInt(control.css('borderBottomWidth')) || 0;

    // Menu position
    options
      .width(control.innerWidth())
      .css({
        top: control.offset().top + control.outerHeight() - borderBottomWidth,
        left: control.offset().left
      }).addClass('show');


    if (select.triggerHandler('beforeopen')) {
      return false;
    }

    var dispatchOpenEvent = function () {
      select.triggerHandler('open', {
        _selectBox: true
      });
    };

    // Show menu
    switch (settings.menuTransition) {
      case 'fade':
        options.fadeIn(settings.menuSpeed, dispatchOpenEvent);
        break;
      case 'slide':
        options.slideDown(settings.menuSpeed, dispatchOpenEvent);
        break;
      default:
        options.show(settings.menuSpeed, dispatchOpenEvent);
        break;
    }

    if (!settings.menuSpeed) {
      dispatchOpenEvent();
    }

    // Center on selected option
    var li = options.find('.selectBox-selected:first');
    this.keepOptionInView(li, true);
    this.addHover(li);
    control.addClass('selectBox-menuShowing');

    $(document).bind('mousedown.selectBox', function (event) {
      if (1 === event.which) {
        if ($(event.target).parents().andSelf().hasClass('selectBox-options')) {
          return;
        }
        self.hideMenus();
      }
    });
  };

  /**
   * Hides the menu of all instances.
   */
  SelectBox.prototype.hideMenus = function () {
    if ($(".selectBox-dropdown-menu:visible").length === 0) {
      return;
    }

    $(document).unbind('mousedown.selectBox');
    $(".selectBox-dropdown-menu").each(function () {
      var options = $(this)
        , select = options.data('selectBox-select')
        , control = select.data('selectBox-control')
        , settings = select.data('selectBox-settings');

      options.removeClass('show');

      if (select.triggerHandler('beforeclose')) {
        return false;
      }

      var dispatchCloseEvent = function () {
        select.triggerHandler('close', {
          _selectBox: true
        });
      };

      if (settings) {
        switch (settings.menuTransition) {
          case 'fade':
            options.fadeOut(settings.menuSpeed, dispatchCloseEvent);
            break;
          case 'slide':
            options.slideUp(settings.menuSpeed, dispatchCloseEvent);
            break;
          default:
            options.hide(settings.menuSpeed, dispatchCloseEvent);
            break;
        }
        if (!settings.menuSpeed) {
          dispatchCloseEvent();
        }
        control.removeClass('selectBox-menuShowing');
      } else {
        $(this).hide();
        $(this).triggerHandler('close', {
          _selectBox: true
        });
        $(this).removeClass('selectBox-menuShowing');
      }
    });
  };

  /**
   * Selects an option.
   *
   * @param {HTMLElement} li
   * @param {DOMEvent}    event
   * @returns {Boolean}
   */
  SelectBox.prototype.selectOption = function (li, event) {
    var select = $(this.selectElement);
    li         = $(li);

    var control    = select.data('selectBox-control')
      , settings = select.data('selectBox-settings');

    if (control.hasClass('selectBox-disabled')) {
      return false;
    }

    if (0 === li.length || li.hasClass('selectBox-disabled')) {
      return false;
    }

    if (select.attr('multiple')) {
      // If event.shiftKey is true, this will select all options between li and the last li selected
      if (event.shiftKey && control.data('selectBox-last-selected')) {
        li.toggleClass('selectBox-selected');
        var affectedOptions;
        if (li.index() > control.data('selectBox-last-selected').index()) {
          affectedOptions = li
            .siblings()
            .slice(control.data('selectBox-last-selected').index(), li.index());
        } else {
          affectedOptions = li
            .siblings()
            .slice(li.index(), control.data('selectBox-last-selected').index());
        }
        affectedOptions = affectedOptions.not('.selectBox-optgroup, .selectBox-disabled');
        if (li.hasClass('selectBox-selected')) {
          affectedOptions.addClass('selectBox-selected');
        } else {
          affectedOptions.removeClass('selectBox-selected');
        }
      } else if ((this.isMac && event.metaKey) || (!this.isMac && event.ctrlKey)) {
        li.toggleClass('selectBox-selected');
      } else {
        li.siblings().removeClass('selectBox-selected');
        li.addClass('selectBox-selected');
      }
    } else {
      li.siblings().removeClass('selectBox-selected');
      li.addClass('selectBox-selected');
    }

    if (control.hasClass('selectBox-dropdown')) {
      control.find('.selectBox-label').text(li.text());
    }

    // Update original control's value
    var i = 0, selection = [];
    if (select.attr('multiple')) {
      control.find('.selectBox-selected A').each(function () {
        selection[i++] = $(this).attr('rel');
      });
    } else {
      selection = li.find('A').attr('rel');
    }

    // Remember most recently selected item
    control.data('selectBox-last-selected', li);

    // Change callback
    if (select.val() !== selection) {
      select.val(selection);
      this.setLabel();
      select.trigger('change');
    }

    return true;
  };

  /**
   * Adds the hover class.
   *
   * @param {HTMLElement} li
   */
  SelectBox.prototype.addHover = function (li) {
    li = $(li);
    var select = $(this.selectElement)
      , control   = select.data('selectBox-control')
      , options = control.data('selectBox-options');

    options.find('.selectBox-hover').removeClass('selectBox-hover');
    li.addClass('selectBox-hover');
  };

  /**
   * Returns the original HTML select element.
   *
   * @returns {HTMLElement}
   */
  SelectBox.prototype.getSelectElement = function () {
    return this.selectElement;
  };

  /**
   * Remove the hover class.
   *
   * @param {HTMLElement} li
   */
  SelectBox.prototype.removeHover = function (li) {
    li = $(li);
    var select = $(this.selectElement)
      , control = select.data('selectBox-control')
      , options = control.data('selectBox-options');

    options.find('.selectBox-hover').removeClass('selectBox-hover');
  };

  /**
   * Checks if the widget is in the view.
   *
   * @param {jQuery}      li
   * @param {Boolean}     center
   */
  SelectBox.prototype.keepOptionInView = function (li, center) {
    if (!li || li.length === 0) {
      return;
    }

    var select = $(this.selectElement)
      , control     = select.data('selectBox-control')
      , options   = control.data('selectBox-options')
      , scrollBox = control.hasClass('selectBox-dropdown') ? options : options.parent()
      , top       = parseInt(li.offset().top -scrollBox.position().top)
      , bottom    = parseInt(top + li.outerHeight());

    if (center) {
      scrollBox.scrollTop(li.offset().top - scrollBox.offset().top + scrollBox.scrollTop() -
        (scrollBox.height() / 2));
    } else {
      if (top < 0) {
        scrollBox.scrollTop(li.offset().top - scrollBox.offset().top + scrollBox.scrollTop());
      }
      if (bottom > scrollBox.height()) {
        scrollBox.scrollTop((li.offset().top + li.outerHeight()) - scrollBox.offset().top +
          scrollBox.scrollTop() - scrollBox.height());
      }
    }
  };

  /**
   * Handles the keyDown event.
   * Handles open/close and arrow key functionality
   *
   * @param {DOMEvent}    event
   */
  SelectBox.prototype.handleKeyDown = function (event) {
    var select = $(this.selectElement)
      , control        = select.data('selectBox-control')
      , options      = control.data('selectBox-options')
      , settings     = select.data('selectBox-settings')
      , totalOptions = 0, i = 0;

    if (control.hasClass('selectBox-disabled')) {
      return;
    }

    switch (event.keyCode) {
      case 8:
        // backspace
        event.preventDefault();
        this.typeSearch = '';
        break;
      case 9:
      // tab
      case 27:
        // esc
        this.hideMenus();
        this.removeHover();
        break;
      case 13:
        // enter
        if (control.hasClass('selectBox-menuShowing')) {
          this.selectOption(options.find('LI.selectBox-hover:first'), event);
          if (control.hasClass('selectBox-dropdown')) {
            this.hideMenus();
          }
        } else {
          this.showMenu();
        }
        break;
      case 38:
      // up
      case 37:
        // left
        event.preventDefault();
        if (control.hasClass('selectBox-menuShowing')) {
          var prev = options.find('.selectBox-hover').prev('LI');
          totalOptions = options.find('LI:not(.selectBox-optgroup)').length;
          i = 0;
          while (prev.length === 0 || prev.hasClass('selectBox-disabled') ||
          prev.hasClass('selectBox-optgroup')) {
            prev = prev.prev('LI');
            if (prev.length === 0) {
              if (settings.loopOptions) {
                prev = options.find('LI:last');
              } else {
                prev = options.find('LI:first');
              }
            }
            if (++i >= totalOptions) {
              break;
            }
          }
          this.addHover(prev);
          this.selectOption(prev, event);
          this.keepOptionInView(prev);
        } else {
          this.showMenu();
        }
        break;
      case 40:
      // down
      case 39:
        // right
        event.preventDefault();
        if (control.hasClass('selectBox-menuShowing')) {
          var next = options.find('.selectBox-hover').next('LI');
          totalOptions = options.find('LI:not(.selectBox-optgroup)').length;
          i = 0;
          while (0 === next.length || next.hasClass('selectBox-disabled') ||
          next.hasClass('selectBox-optgroup')) {
            next = next.next('LI');
            if (next.length === 0) {
              if (settings.loopOptions) {
                next = options.find('LI:first');
              } else {
                next = options.find('LI:last');
              }
            }
            if (++i >= totalOptions) {
              break;
            }
          }
          this.addHover(next);
          this.selectOption(next, event);
          this.keepOptionInView(next);
        } else {
          this.showMenu();
        }
        break;
    }
  };

  /**
   * Handles the keyPress event.
   * Handles type-to-find functionality
   *
   * @param {DOMEvent}    event
   */
  SelectBox.prototype.handleKeyPress = function (event) {
    var select = $(this.selectElement)
      , control = select.data('selectBox-control')
      , options = control.data('selectBox-options');

    if (control.hasClass('selectBox-disabled')) {
      return;
    }

    switch (event.keyCode) {
      case 9:
      // tab
      case 27:
      // esc
      case 13:
      // enter
      case 38:
      // up
      case 37:
      // left
      case 40:
      // down
      case 39:
        // right
        // Don't interfere with the keydown event!
        break;
      default:
        // Type to find
        if (!control.hasClass('selectBox-menuShowing')) {
          this.showMenu();
        }
        event.preventDefault();
        clearTimeout(this.typeTimer);
        this.typeSearch += String.fromCharCode(event.charCode || event.keyCode);
        options.find('A').each(function () {
          if ($(this).text().substr(0, this.typeSearch.length).toLowerCase() === this.typeSearch.toLowerCase()) {
            this.addHover($(this).parent());
            this.selectOption($(this).parent(), event);
            this.keepOptionInView($(this).parent());
            return false;
          }
        });
        // Clear after a brief pause
        this.typeTimer = setTimeout(function () {
          this.typeSearch = '';
        }, 1000);
        break;
    }
  };

  /**
   * Enables the selectBox.
   */
  SelectBox.prototype.enable = function () {
    var select = $(this.selectElement);
    select.prop('disabled', false);
    var control = select.data('selectBox-control');
    if (!control) {
      return;
    }
    control.removeClass('selectBox-disabled');
  };

  /**
   * Disables the selectBox.
   */
  SelectBox.prototype.disable = function () {
    var select = $(this.selectElement);
    select.prop('disabled', true);
    var control = select.data('selectBox-control');
    if (!control) {
      return;
    }
    control.addClass('selectBox-disabled');
  };

  /**
   * Sets the current value.
   *
   * @param {String}      value
   */
  SelectBox.prototype.setValue = function (value) {
    var select = $(this.selectElement);
    select.val(value);
    value = select.val(); // IE9's select would be null if it was set with a non-exist options value

    if (null === value) { // So check it here and set it with the first option's value if possible
      value = select.children().first().val();
      select.val(value);
    }

    var control = select.data('selectBox-control');
    if (!control) {
      return;
    }

    var settings = select.data('selectBox-settings')
      , options = control.data('selectBox-options');

    // Update label
    this.setLabel();

    // Update control values
    options.find('.selectBox-selected').removeClass('selectBox-selected');
    options.find('A').each(function () {
      if (typeof(value) === 'object') {
        for (var i = 0; i < value.length; i++) {
          if ($(this).attr('rel') == value[i]) {
            $(this).parent().addClass('selectBox-selected');
          }
        }
      } else {
        if ($(this).attr('rel') == value) {
          $(this).parent().addClass('selectBox-selected');
        }
      }
    });

    if (settings.change) {
      settings.change.call(select);
    }
  };

  /**
   * Sets the option elements.
   *
   * @param {String|Object} options
   */
  SelectBox.prototype.setOptions = function (options) {
    var select = $(this.selectElement)
      , control = select.data('selectBox-control')
      , settings = select.data('selectBox-settings')
      , type;

    switch (typeof(options)) {
      case 'string':
        select.html(options);
        break;
      case 'object':
        select.html('');
        for (var i in options) {
          if (options[i] === null) {
            continue;
          }
          if (typeof(options[i]) === 'object') {
            var optgroup = $('<optgroup label="' + i + '" />');
            for (var j in options[i]) {
              optgroup.append('<option value="' + j + '">' + options[i][j] + '</option>');
            }
            select.append(optgroup);
          } else {
            var option = $('<option value="' + i + '">' + options[i] + '</option>');
            select.append(option);
          }
        }
        break;
    }

    if (!control) {
      return;
    }

    // Remove old options
    control.data('selectBox-options').remove();

    // Generate new options
    type     = control.hasClass('selectBox-dropdown') ? 'dropdown' : 'inline';
    options  = this.getOptions(type);
    control.data('selectBox-options', options);

    switch (type) {
      case 'inline':
        control.append(options);
        break;
      case 'dropdown':
        // Update label
        this.setLabel();
        $("BODY").append(options);
        break;
    }
  };

  /**
   * Disables the selection.
   *
   * @param {*} selector
   */
  SelectBox.prototype.disableSelection = function (selector) {
    $(selector).css('MozUserSelect', 'none').bind('selectstart', function (event) {
      event.preventDefault();
    });
  };

  /**
   * Generates the options.
   *
   * @param {jQuery} self
   * @param {jQuery} options
   */
  SelectBox.prototype.generateOptions = function (self, options) {
    var li = $('<li />'), a = $('<a />');
    li.addClass(self.attr('class'));
    li.data(self.data());
    a.attr('rel', self.val()).text(self.text());
    li.append(a);
    if (self.attr('disabled')) {
      li.addClass('selectBox-disabled');
    }
    if (self.attr('selected')) {
      li.addClass('selectBox-selected');
    }
    options.append(li);
  };

  /**
   * Extends the jQuery.fn object.
   */
  $.extend($.fn, {
    selectBox: function (method, options) {
      var selectBox;

      switch (method) {
        case 'control':
          return $(this).data('selectBox-control');
        case 'settings':
          if (!options) {
            return $(this).data('selectBox-settings');
          }
          $(this).each(function () {
            $(this).data('selectBox-settings', $.extend(true, $(this).data('selectBox-settings'), options));
          });
          break;
        case 'options':
          // Getter
          if (undefined === options) {
            return $(this).data('selectBox-control').data('selectBox-options');
          }
          // Setter
          $(this).each(function () {
            if (selectBox = $(this).data('selectBox')) {
              selectBox.setOptions(options);
            }
          });
          break;
        case 'value':
          // Empty string is a valid value
          if (undefined === options) {
            return $(this).val();
          }
          $(this).each(function () {
            if (selectBox = $(this).data('selectBox')) {
              selectBox.setValue(options);
            }
          });
          break;
        case 'refresh':
          $(this).each(function () {
            if (selectBox = $(this).data('selectBox')) {
              selectBox.refresh();
            }
          });
          break;
        case 'enable':
          $(this).each(function () {
            if (selectBox = $(this).data('selectBox')) {
              selectBox.enable(this);
            }
          });
          break;
        case 'disable':
          $(this).each(function () {
            if (selectBox = $(this).data('selectBox')) {
              selectBox.disable();
            }
          });
          break;
        case 'destroy':
          $(this).each(function () {
            if (selectBox = $(this).data('selectBox')) {
              selectBox.destroy();
              $(this).data('selectBox', null);
            }
          });
          break;
        case 'instance':
          return $(this).data('selectBox');
        default:
          $(this).each(function (idx, select) {
            if (!$(select).data('selectBox')) {
              $(select).data('selectBox', new SelectBox(select, method));
            }
          });
          break;
      }
      return $(this);
    }
  });
})(jQuery);










/*** jquery.ezmark.min.js ***/

/**
 * ezMark (Minified) - A Simple Checkbox and Radio button Styling plugin. This plugin allows you to use a custom Image for
 * Checkbox or Radio button. Its very simple, small and easy to use.
 *
 * Copyright (c) Abdullah Rubiyath <http://www.itsalif.info/>.
 * Released under MIT License
 *
 * @author Abdullah Rubiyath
 * @version 1.0
 * @date June 27, 2010
 */
(function ($) {
  $.fn.ezMark = function (options) {
    options = options || {};
    var defaultOpt = {
      checkboxCls: options.checkboxCls || 'ez-checkbox',
      radioCls: options.radioCls || 'ez-radio',
      checkedCls: options.checkedCls || 'ez-checked',
      selectedCls: options.selectedCls || 'ez-selected',
      hideCls: 'ez-hide'
    };
    return this.each(function () {
      var $this = $(this);
      var wrapTag = $this.attr('type') == 'checkbox' ? '<div class="' + defaultOpt.checkboxCls + '">' : '<div class="' + defaultOpt.radioCls + '">';
      if ($this.attr('type') == 'checkbox') {
        $this.addClass(defaultOpt.hideCls).wrap(wrapTag).change(function () {
          if ($(this).is(':checked')) {
            $(this).parent().addClass(defaultOpt.checkedCls);
            $(this).parent().parent().addClass('chk_on');
          } else {
            $(this).parent().removeClass(defaultOpt.checkedCls);
            $(this).parent().parent().removeClass('chk_on');
          }
          if ($(this).is(':disabled')) {
            // $(this).parent().addClass(defaultOpt.checkedCls);
            $(this).parent().parent().addClass('ez-disabled');
          } else {
            // $(this).parent().removeClass(defaultOpt.checkedCls);
            $(this).parent().parent().removeClass('ez-disabled');
          }

        });

        if ($(this).is(':disabled')) {
          $(this).parent().parent().addClass('ez-disabled');
        }
        if ( $this.hasClass('chk_b_ty')) {
          $this.parent().addClass('ez-chk-big');
        }

        if ($this.is(':checked')) {
          $this.parent().addClass(defaultOpt.checkedCls);
          $(this).parent().parent().addClass('chk_on');
        }
      } else if ($this.attr('type') == 'radio') {
        $this.addClass(defaultOpt.hideCls).wrap(wrapTag).change(function () {
          $('input[name="' + $(this).attr('name') + '"]').each(function () {
            if ($(this).is(':checked')) {
              $(this).parent().addClass(defaultOpt.selectedCls);
              $(this).parent().parent().addClass('chk_on');
            } else {
              $(this).parent().removeClass(defaultOpt.selectedCls);
              $(this).parent().parent().removeClass('chk_on');
            }

            if ($(this).is(':disabled')) {
              //  $(this).parent().addClass(defaultOpt.checkedCls);
              $(this).parent().parent().addClass('ez-disabled');
            } else {
              // $(this).parent().removeClass(defaultOpt.checkedCls);
              $(this).parent().parent().removeClass('ez-disabled');
            }
          });
        });
        if ($(this).is(':disabled')) {
          $(this).parent().parent().addClass('ez-disabled');
        }
        if ($this.is(':checked')) {
          $this.parent().addClass(defaultOpt.selectedCls);
          $(this).parent().parent().addClass('chk_on');
        }
      }
    });
  }
})(jQuery);










/*** placeholders.min.js ***/

/* Placeholders.js v3.0.2 */
/*
(function(t){"use strict";function e(t,e,r){return t.addEventListener?t.addEventListener(e,r,!1):t.attachEvent?t.attachEvent("on"+e,r):void 0}function r(t,e){var r,n;for(r=0,n=t.length;n>r;r++)if(t[r]===e)return!0;return!1}function n(t,e){var r;t.createTextRange?(r=t.createTextRange(),r.move("character",e),r.select()):t.selectionStart&&(t.focus(),t.setSelectionRange(e,e))}function a(t,e){try{return t.type=e,!0}catch(r){return!1}}t.Placeholders={Utils:{addEventListener:e,inArray:r,moveCaret:n,changeType:a}}})(this),function(t){"use strict";function e(){}function r(){try{return document.activeElement}catch(t){}}function n(t,e){var r,n,a=!!e&&t.value!==e,u=t.value===t.getAttribute(V);return(a||u)&&"true"===t.getAttribute(D)?(t.removeAttribute(D),t.value=t.value.replace(t.getAttribute(V),""),t.className=t.className.replace(R,""),n=t.getAttribute(F),parseInt(n,10)>=0&&(t.setAttribute("maxLength",n),t.removeAttribute(F)),r=t.getAttribute(P),r&&(t.type=r),!0):!1}function a(t){var e,r,n=t.getAttribute(V);return""===t.value&&n?(t.setAttribute(D,"true"),t.value=n,t.className+=" "+I,r=t.getAttribute(F),r||(t.setAttribute(F,t.maxLength),t.removeAttribute("maxLength")),e=t.getAttribute(P),e?t.type="text":"password"===t.type&&M.changeType(t,"text")&&t.setAttribute(P,"password"),!0):!1}function u(t,e){var r,n,a,u,i,l,o;if(t&&t.getAttribute(V))e(t);else for(a=t?t.getElementsByTagName("input"):b,u=t?t.getElementsByTagName("textarea"):f,r=a?a.length:0,n=u?u.length:0,o=0,l=r+n;l>o;o++)i=r>o?a[o]:u[o-r],e(i)}function i(t){u(t,n)}function l(t){u(t,a)}function o(t){return function(){m&&t.value===t.getAttribute(V)&&"true"===t.getAttribute(D)?M.moveCaret(t,0):n(t)}}function c(t){return function(){a(t)}}function s(t){return function(e){return A=t.value,"true"===t.getAttribute(D)&&A===t.getAttribute(V)&&M.inArray(C,e.keyCode)?(e.preventDefault&&e.preventDefault(),!1):void 0}}function d(t){return function(){n(t,A),""===t.value&&(t.blur(),M.moveCaret(t,0))}}function g(t){return function(){t===r()&&t.value===t.getAttribute(V)&&"true"===t.getAttribute(D)&&M.moveCaret(t,0)}}function v(t){return function(){i(t)}}function p(t){t.form&&(T=t.form,"string"==typeof T&&(T=document.getElementById(T)),T.getAttribute(U)||(M.addEventListener(T,"submit",v(T)),T.setAttribute(U,"true"))),M.addEventListener(t,"focus",o(t)),M.addEventListener(t,"blur",c(t)),m&&(M.addEventListener(t,"keydown",s(t)),M.addEventListener(t,"keyup",d(t)),M.addEventListener(t,"click",g(t))),t.setAttribute(j,"true"),t.setAttribute(V,x),(m||t!==r())&&a(t)}var b,f,m,h,A,y,E,x,L,T,N,S,w,B=["text","search","url","tel","email","password","number","textarea"],C=[27,33,34,35,36,37,38,39,40,8,46],k="#ccc",I="placeholdersjs",R=RegExp("(?:^|\\s)"+I+"(?!\\S)"),V="data-placeholder-value",D="data-placeholder-active",P="data-placeholder-type",U="data-placeholder-submit",j="data-placeholder-bound",q="data-placeholder-focus",z="data-placeholder-live",F="data-placeholder-maxlength",G=document.createElement("input"),H=document.getElementsByTagName("head")[0],J=document.documentElement,K=t.Placeholders,M=K.Utils;if(K.nativeSupport=void 0!==G.placeholder,!K.nativeSupport){for(b=document.getElementsByTagName("input"),f=document.getElementsByTagName("textarea"),m="false"===J.getAttribute(q),h="false"!==J.getAttribute(z),y=document.createElement("style"),y.type="text/css",E=document.createTextNode("."+I+" { color:"+k+"; }"),y.styleSheet?y.styleSheet.cssText=E.nodeValue:y.appendChild(E),H.insertBefore(y,H.firstChild),w=0,S=b.length+f.length;S>w;w++)N=b.length>w?b[w]:f[w-b.length],x=N.attributes.placeholder,x&&(x=x.nodeValue,x&&M.inArray(B,N.type)&&p(N));L=setInterval(function(){for(w=0,S=b.length+f.length;S>w;w++)N=b.length>w?b[w]:f[w-b.length],x=N.attributes.placeholder,x?(x=x.nodeValue,x&&M.inArray(B,N.type)&&(N.getAttribute(j)||p(N),(x!==N.getAttribute(V)||"password"===N.type&&!N.getAttribute(P))&&("password"===N.type&&!N.getAttribute(P)&&M.changeType(N,"text")&&N.setAttribute(P,"password"),N.value===N.getAttribute(V)&&(N.value=x),N.setAttribute(V,x)))):N.getAttribute(D)&&(n(N),N.removeAttribute(V));h||clearInterval(L)},100)}M.addEventListener(t,"beforeunload",function(){K.disable()}),K.disable=K.nativeSupport?e:i,K.enable=K.nativeSupport?e:l}(this);
*/










/*** jquery.scrollbar.js ***/

/**
 * jQuery CSS Customizable Scrollbar
 *
 * Copyright 2015, Yuriy Khabarov
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * If you found bug, please contact me via email <13real008@gmail.com>
 *
 * @author Yuriy Khabarov aka Gromo
 * @version 0.2.10
 * @url https://github.com/gromo/jquery.scrollbar/
 *
 */
;
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(root.jQuery);
  }
}(this, function ($) {
  'use strict';

  // init flags & variables
  var debug = false;

  var browser = {
    data: {
      index: 0,
      name: 'scrollbar'
    },
    macosx: /mac/i.test(navigator.platform),
    mobile: /android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent),
    overlay: null,
    scroll: null,
    scrolls: [],
    webkit: /webkit/i.test(navigator.userAgent) && !/edge\/\d+/i.test(navigator.userAgent)
  };

  browser.scrolls.add = function (instance) {
    this.remove(instance).push(instance);
  };
  browser.scrolls.remove = function (instance) {
    while ($.inArray(instance, this) >= 0) {
      this.splice($.inArray(instance, this), 1);
    }
    return this;
  };

  var defaults = {
    "autoScrollSize": true,     // automatically calculate scrollsize
    "autoUpdate": true,         // update scrollbar if content/container size changed
    "debug": false,             // debug mode
    "disableBodyScroll": false, // disable body scroll if mouse over container
    "duration": 400,            // scroll animate duration in ms
    "ignoreMobile": false,      // ignore mobile devices
    "ignoreOverlay": false,     // ignore browsers with overlay scrollbars (mobile, MacOS)
    "scrollStep": 30,           // scroll step for scrollbar arrows
    "showArrows": false,        // add class to show arrows
    "stepScrolling": true,      // when scrolling to scrollbar mousedown position

    "scrollx": null,            // horizontal scroll element
    "scrolly": null,            // vertical scroll element

    "onDestroy": null,          // callback function on destroy,
    "onInit": null,             // callback function on first initialization
    "onScroll": null,           // callback function on content scrolling
    "onUpdate": null            // callback function on init/resize (before scrollbar size calculation)
  };


  var BaseScrollbar = function (container) {

    if (!browser.scroll) {
      browser.overlay = isScrollOverlaysContent();
      browser.scroll = getBrowserScrollSize();
      updateScrollbars();

      $(window).resize(function () {
        var forceUpdate = false;
        if (browser.scroll && (browser.scroll.height || browser.scroll.width)) {
          var scroll = getBrowserScrollSize();
          if (scroll.height !== browser.scroll.height || scroll.width !== browser.scroll.width) {
            browser.scroll = scroll;
            forceUpdate = true; // handle page zoom
          }
        }
        updateScrollbars(forceUpdate);
      });
    }

    this.container = container;
    this.namespace = '.scrollbar_' + browser.data.index++;
    this.options = $.extend({}, defaults, window.jQueryScrollbarOptions || {});
    this.scrollTo = null;
    this.scrollx = {};
    this.scrolly = {};

    container.data(browser.data.name, this);
    browser.scrolls.add(this);
  };

  BaseScrollbar.prototype = {

    destroy: function () {

      if (!this.wrapper) {
        return;
      }

      this.container.removeData(browser.data.name);
      browser.scrolls.remove(this);

      // init variables
      var scrollLeft = this.container.scrollLeft();
      var scrollTop = this.container.scrollTop();

      this.container.insertBefore(this.wrapper).css({
        "height": "",
        "margin": "",
        "max-height": ""
      })
        .removeClass('scroll-content scroll-scrollx_visible scroll-scrolly_visible')
        .off(this.namespace)
        .scrollLeft(scrollLeft)
        .scrollTop(scrollTop);

      this.scrollx.scroll.removeClass('scroll-scrollx_visible').find('div').andSelf().off(this.namespace);
      this.scrolly.scroll.removeClass('scroll-scrolly_visible').find('div').andSelf().off(this.namespace);

      this.wrapper.remove();

      $(document).add('body').off(this.namespace);

      if ($.isFunction(this.options.onDestroy)){
        this.options.onDestroy.apply(this, [this.container]);
      }
    },
    init: function (options) {

      // init variables
      var S = this,
        c = this.container,
        cw = this.containerWrapper || c,
        namespace = this.namespace,
        o = $.extend(this.options, options || {}),
        s = {x: this.scrollx, y: this.scrolly},
        w = this.wrapper;

      var initScroll = {
        "scrollLeft": c.scrollLeft(),
        "scrollTop": c.scrollTop()
      };

      // do not init if in ignorable browser
      if ((browser.mobile && o.ignoreMobile)
        || (browser.overlay && o.ignoreOverlay)
        || (browser.macosx && !browser.webkit) // still required to ignore nonWebKit browsers on Mac
      ) {
        return false;
      }

      // init scroll container
      if (!w) {
        this.wrapper = w = $('<div>').addClass('scroll-wrapper').addClass(c.attr('class'))
          .css('position', c.css('position') == 'absolute' ? 'absolute' : 'relative')
          .insertBefore(c).append(c);

        if (c.is('textarea')) {
          this.containerWrapper = cw = $('<div>').insertBefore(c).append(c);
          w.addClass('scroll-textarea');
        }

        cw.addClass('scroll-content').css({
          "height": "auto",
          "margin-bottom": browser.scroll.height * -1 + 'px',
          "margin-right": browser.scroll.width * -1 + 'px',
          "max-height": ""
        });

        c.on('scroll' + namespace, function (event) {
          if ($.isFunction(o.onScroll)) {
            o.onScroll.call(S, {
              "maxScroll": s.y.maxScrollOffset,
              "scroll": c.scrollTop(),
              "size": s.y.size,
              "visible": s.y.visible
            }, {
              "maxScroll": s.x.maxScrollOffset,
              "scroll": c.scrollLeft(),
              "size": s.x.size,
              "visible": s.x.visible
            });
          }
          s.x.isVisible && s.x.scroll.bar.css('left', c.scrollLeft() * s.x.kx + 'px');
          s.y.isVisible && s.y.scroll.bar.css('top', c.scrollTop() * s.y.kx + 'px');
          //$('select').selectBox("refresh");
          $('.selectBox-dropdown-menu').hide();
          $('a.selectBox').removeClass('selectBox-menuShowing');
          $('a.selectBox').removeClass('selectBox-active');
        });

        /* prevent native scrollbars to be visible on #anchor click */
        w.on('scroll' + namespace, function () {
          w.scrollTop(0).scrollLeft(0);
        });

        if (o.disableBodyScroll) {
          var handleMouseScroll = function (event) {
            isVerticalScroll(event) ?
              s.y.isVisible && s.y.mousewheel(event) :
              s.x.isVisible && s.x.mousewheel(event);
          };
          w.on('MozMousePixelScroll' + namespace, handleMouseScroll);
          w.on('mousewheel' + namespace, handleMouseScroll);

          if (browser.mobile) {
            w.on('touchstart' + namespace, function (event) {
              var touch = event.originalEvent.touches && event.originalEvent.touches[0] || event;
              var originalTouch = {
                "pageX": touch.pageX,
                "pageY": touch.pageY
              };
              var originalScroll = {
                "left": c.scrollLeft(),
                "top": c.scrollTop()
              };
              $(document).on('touchmove' + namespace, function (event) {
                var touch = event.originalEvent.targetTouches && event.originalEvent.targetTouches[0] || event;
                c.scrollLeft(originalScroll.left + originalTouch.pageX - touch.pageX);
                c.scrollTop(originalScroll.top + originalTouch.pageY - touch.pageY);
                event.preventDefault();
              });
              $(document).on('touchend' + namespace, function () {
                $(document).off(namespace);
              });
            });
          }
        }
        if ($.isFunction(o.onInit)){
          o.onInit.apply(this, [c]);
        }
      } else {
        cw.css({
          "height": "auto",
          "margin-bottom": browser.scroll.height * -1 + 'px',
          "margin-right": browser.scroll.width * -1 + 'px',
          "max-height": ""
        });
      }

      // init scrollbars & recalculate sizes
      $.each(s, function (d, scrollx) {

        var scrollCallback = null;
        var scrollForward = 1;
        var scrollOffset = (d === 'x') ? 'scrollLeft' : 'scrollTop';
        var scrollStep = o.scrollStep;
        var scrollTo = function () {
          var currentOffset = c[scrollOffset]();
          c[scrollOffset](currentOffset + scrollStep);
          if (scrollForward == 1 && (currentOffset + scrollStep) >= scrollToValue)
            currentOffset = c[scrollOffset]();
          if (scrollForward == -1 && (currentOffset + scrollStep) <= scrollToValue)
            currentOffset = c[scrollOffset]();
          if (c[scrollOffset]() == currentOffset && scrollCallback) {
            scrollCallback();
          }
        }
        var scrollToValue = 0;

        if (!scrollx.scroll) {

          scrollx.scroll = S._getScroll(o['scroll' + d]).addClass('scroll-' + d);

          if(o.showArrows){
            scrollx.scroll.addClass('scroll-element_arrows_visible');
          }

          scrollx.mousewheel = function (event) {

            if (!scrollx.isVisible || (d === 'x' && isVerticalScroll(event))) {
              return true;
            }
            if (d === 'y' && !isVerticalScroll(event)) {
              s.x.mousewheel(event);
              return true;
            }

            var delta = event.originalEvent.wheelDelta * -1 || event.originalEvent.detail;
            var maxScrollValue = scrollx.size - scrollx.visible - scrollx.offset;

            if ((delta > 0 && scrollToValue < maxScrollValue) || (delta < 0 && scrollToValue > 0)) {
              scrollToValue = scrollToValue + delta;
              if (scrollToValue < 0)
                scrollToValue = 0;
              if (scrollToValue > maxScrollValue)
                scrollToValue = maxScrollValue;

              S.scrollTo = S.scrollTo || {};
              S.scrollTo[scrollOffset] = scrollToValue;
              setTimeout(function () {
                if (S.scrollTo) {
                  c.stop().animate(S.scrollTo, 240, 'linear', function () {
                    scrollToValue = c[scrollOffset]();
                  });
                  S.scrollTo = null;
                }
              }, 1);
            }

            event.preventDefault();
            return false;
          };

          scrollx.scroll
            .on('MozMousePixelScroll' + namespace, scrollx.mousewheel)
            .on('mousewheel' + namespace, scrollx.mousewheel)
            .on('mouseenter' + namespace, function () {
              scrollToValue = c[scrollOffset]();
            });

          // handle arrows & scroll inner mousedown event
          scrollx.scroll.find('.scroll-arrow, .scroll-element_track')
            .on('mousedown' + namespace, function (event) {

              if (event.which != 1) // lmb
                return true;

              scrollForward = 1;

              var data = {
                "eventOffset": event[(d === 'x') ? 'pageX' : 'pageY'],
                "maxScrollValue": scrollx.size - scrollx.visible - scrollx.offset,
                "scrollbarOffset": scrollx.scroll.bar.offset()[(d === 'x') ? 'left' : 'top'],
                "scrollbarSize": scrollx.scroll.bar[(d === 'x') ? 'outerWidth' : 'outerHeight']()
              };
              var timeout = 0, timer = 0;

              if ($(this).hasClass('scroll-arrow')) {
                scrollForward = $(this).hasClass("scroll-arrow_more") ? 1 : -1;
                scrollStep = o.scrollStep * scrollForward;
                scrollToValue = scrollForward > 0 ? data.maxScrollValue : 0;
              } else {
                scrollForward = (data.eventOffset > (data.scrollbarOffset + data.scrollbarSize) ? 1
                  : (data.eventOffset < data.scrollbarOffset ? -1 : 0));
                scrollStep = Math.round(scrollx.visible * 0.75) * scrollForward;
                scrollToValue = (data.eventOffset - data.scrollbarOffset -
                  (o.stepScrolling ? (scrollForward == 1 ? data.scrollbarSize : 0)
                    : Math.round(data.scrollbarSize / 2)));
                scrollToValue = c[scrollOffset]() + (scrollToValue / scrollx.kx);
              }

              S.scrollTo = S.scrollTo || {};
              S.scrollTo[scrollOffset] = o.stepScrolling ? c[scrollOffset]() + scrollStep : scrollToValue;

              if (o.stepScrolling) {
                scrollCallback = function () {
                  scrollToValue = c[scrollOffset]();
                  clearInterval(timer);
                  clearTimeout(timeout);
                  timeout = 0;
                  timer = 0;
                };
                timeout = setTimeout(function () {
                  timer = setInterval(scrollTo, 40);
                }, o.duration + 100);
              }

              setTimeout(function () {
                if (S.scrollTo) {
                  c.animate(S.scrollTo, o.duration);
                  S.scrollTo = null;
                }
              }, 1);

              return S._handleMouseDown(scrollCallback, event);
            });

          // handle scrollbar drag'n'drop
          scrollx.scroll.bar.on('mousedown' + namespace, function (event) {

            if (event.which != 1) // lmb
              return true;

            var eventPosition = event[(d === 'x') ? 'pageX' : 'pageY'];
            var initOffset = c[scrollOffset]();

            scrollx.scroll.addClass('scroll-draggable');

            $(document).on('mousemove' + namespace, function (event) {
              var diff = parseInt((event[(d === 'x') ? 'pageX' : 'pageY'] - eventPosition) / scrollx.kx, 10);
              c[scrollOffset](initOffset + diff);
            });

            return S._handleMouseDown(function () {
              scrollx.scroll.removeClass('scroll-draggable');
              scrollToValue = c[scrollOffset]();
            }, event);
          });
        }
      });

      // remove classes & reset applied styles
      $.each(s, function (d, scrollx) {
        var scrollClass = 'scroll-scroll' + d + '_visible';
        var scrolly = (d == "x") ? s.y : s.x;

        scrollx.scroll.removeClass(scrollClass);
        scrolly.scroll.removeClass(scrollClass);
        cw.removeClass(scrollClass);
      });

      // calculate init sizes
      $.each(s, function (d, scrollx) {
        $.extend(scrollx, (d == "x") ? {
          "offset": parseInt(c.css('left'), 10) || 0,
          "size": c.prop('scrollWidth'),
          "visible": w.width()
        } : {
          "offset": parseInt(c.css('top'), 10) || 0,
          "size": c.prop('scrollHeight'),
          "visible": w.height()
        });
      });

      // update scrollbar visibility/dimensions
      this._updateScroll('x', this.scrollx);
      this._updateScroll('y', this.scrolly);

      if ($.isFunction(o.onUpdate)){
        o.onUpdate.apply(this, [c]);
      }

      // calculate scroll size
      $.each(s, function (d, scrollx) {

        var cssOffset = (d === 'x') ? 'left' : 'top';
        var cssFullSize = (d === 'x') ? 'outerWidth' : 'outerHeight';
        var cssSize = (d === 'x') ? 'width' : 'height';
        var offset = parseInt(c.css(cssOffset), 10) || 0;

        var AreaSize = scrollx.size;
        var AreaVisible = scrollx.visible + offset;

        var scrollSize = scrollx.scroll.size[cssFullSize]() + (parseInt(scrollx.scroll.size.css(cssOffset), 10) || 0);

        if (o.autoScrollSize) {
          scrollx.scrollbarSize = parseInt(scrollSize * AreaVisible / AreaSize, 10);
          scrollx.scroll.bar.css(cssSize, scrollx.scrollbarSize + 'px');
        }

        scrollx.scrollbarSize = scrollx.scroll.bar[cssFullSize]();
        scrollx.kx = ((scrollSize - scrollx.scrollbarSize) / (AreaSize - AreaVisible)) || 1;
        scrollx.maxScrollOffset = AreaSize - AreaVisible;
      });

      c.scrollLeft(initScroll.scrollLeft).scrollTop(initScroll.scrollTop).trigger('scroll');
    },

    /**
     * Get scrollx/scrolly object
     *
     * @param {Mixed} scroll
     * @returns {jQuery} scroll object
     */
    _getScroll: function (scroll) {
      var types = {
        advanced: [
          '<div class="scroll-element">',
          '<div class="scroll-element_corner"></div>',
          '<div class="scroll-arrow scroll-arrow_less"></div>',
          '<div class="scroll-arrow scroll-arrow_more"></div>',
          '<div class="scroll-element_outer">',
          '<div class="scroll-element_size"></div>', // required! used for scrollbar size calculation !
          '<div class="scroll-element_inner-wrapper">',
          '<div class="scroll-element_inner scroll-element_track">', // used for handling scrollbar click
          '<div class="scroll-element_inner-bottom"></div>',
          '</div>',
          '</div>',
          '<div class="scroll-bar">', // required
          '<div class="scroll-bar_body">',
          '<div class="scroll-bar_body-inner"></div>',
          '</div>',
          '<div class="scroll-bar_bottom"></div>',
          '<div class="scroll-bar_center"></div>',
          '</div>',
          '</div>',
          '</div>'
        ].join(''),
        simple: [
          '<div class="scroll-element">',
          '<div class="scroll-element_outer">',
          '<div class="scroll-element_size"></div>', // required! used for scrollbar size calculation !
          '<div class="scroll-element_track"></div>', // used for handling scrollbar click
          '<div class="scroll-bar"></div>', // required
          '</div>',
          '</div>'
        ].join('')
      };
      if (types[scroll]) {
        scroll = types[scroll];
      }
      if (!scroll) {
        scroll = types['simple'];
      }
      if (typeof (scroll) == 'string') {
        scroll = $(scroll).appendTo(this.wrapper);
      } else {
        scroll = $(scroll);
      }
      $.extend(scroll, {
        bar: scroll.find('.scroll-bar'),
        size: scroll.find('.scroll-element_size'),
        track: scroll.find('.scroll-element_track')
      });
      return scroll;
    },

    _handleMouseDown: function(callback, event) {

      var namespace = this.namespace;

      $(document).on('blur' + namespace, function () {
        $(document).add('body').off(namespace);
        callback && callback();
      });
      $(document).on('dragstart' + namespace, function (event) {
        event.preventDefault();
        return false;
      });
      $(document).on('mouseup' + namespace, function () {
        $(document).add('body').off(namespace);
        callback && callback();
      });
      $('body').on('selectstart' + namespace, function (event) {
        event.preventDefault();
        return false;
      });

      event && event.preventDefault();
      return false;
    },

    _updateScroll: function (d, scrollx) {

      var container = this.container,
        containerWrapper = this.containerWrapper || container,
        scrollClass = 'scroll-scroll' + d + '_visible',
        scrolly = (d === 'x') ? this.scrolly : this.scrollx,
        offset = parseInt(this.container.css((d === 'x') ? 'left' : 'top'), 10) || 0,
        wrapper = this.wrapper;

      var AreaSize = scrollx.size;
      var AreaVisible = scrollx.visible + offset;

      scrollx.isVisible = (AreaSize - AreaVisible) > 1; // bug in IE9/11 with 1px diff
      if (scrollx.isVisible) {
        scrollx.scroll.addClass(scrollClass);
        scrolly.scroll.addClass(scrollClass);
        containerWrapper.addClass(scrollClass);
      } else {
        scrollx.scroll.removeClass(scrollClass);
        scrolly.scroll.removeClass(scrollClass);
        containerWrapper.removeClass(scrollClass);
      }

      if (d === 'y') {
        if(container.is('textarea') || AreaSize < AreaVisible){
          containerWrapper.css({
            "height": (AreaVisible + browser.scroll.height) + 'px',
            "max-height": "none"
          });
        } else {
          containerWrapper.css({
            //"height": "auto", // do not reset height value: issue with height:100%!
            "max-height": (AreaVisible + browser.scroll.height) + 'px'
          });
        }
      }

      if (scrollx.size != container.prop('scrollWidth')
        || scrolly.size != container.prop('scrollHeight')
        || scrollx.visible != wrapper.width()
        || scrolly.visible != wrapper.height()
        || scrollx.offset != (parseInt(container.css('left'), 10) || 0)
        || scrolly.offset != (parseInt(container.css('top'), 10) || 0)
      ) {
        $.extend(this.scrollx, {
          "offset": parseInt(container.css('left'), 10) || 0,
          "size": container.prop('scrollWidth'),
          "visible": wrapper.width()
        });
        $.extend(this.scrolly, {
          "offset": parseInt(container.css('top'), 10) || 0,
          "size": this.container.prop('scrollHeight'),
          "visible": wrapper.height()
        });
        this._updateScroll(d === 'x' ? 'y' : 'x', scrolly);
      }
    }
  };

  var CustomScrollbar = BaseScrollbar;

  /*
     * Extend jQuery as plugin
     *
     * @param {Mixed} command to execute
     * @param {Mixed} arguments as Array
     * @return {jQuery}
     */
  $.fn.scrollbar = function (command, args) {
    if (typeof command !== 'string') {
      args = command;
      command = 'init';
    }
    if (typeof args === 'undefined') {
      args = [];
    }
    if (!$.isArray(args)) {
      args = [args];
    }
    this.not('body, .scroll-wrapper').each(function () {
      var element = $(this),
        instance = element.data(browser.data.name);
      if (instance || command === 'init') {
        if (!instance) {
          instance = new CustomScrollbar(element);
        }
        if (instance[command]) {
          instance[command].apply(instance, args);
        }
      }
    });
    return this;
  };

  /**
   * Connect default options to global object
   */
  $.fn.scrollbar.options = defaults;


  /**
   * Check if scroll content/container size is changed
   */

  var updateScrollbars = (function () {
    var timer = 0,
      timerCounter = 0;

    return function (force) {
      var i, container, options, scroll, wrapper, scrollx, scrolly;
      for (i = 0; i < browser.scrolls.length; i++) {
        scroll = browser.scrolls[i];
        container = scroll.container;
        options = scroll.options;
        wrapper = scroll.wrapper;
        scrollx = scroll.scrollx;
        scrolly = scroll.scrolly;
        if (force || (options.autoUpdate && wrapper && wrapper.is(':visible') &&
          (container.prop('scrollWidth') != scrollx.size || container.prop('scrollHeight') != scrolly.size || wrapper.width() != scrollx.visible || wrapper.height() != scrolly.visible))) {
          scroll.init();

          if (options.debug) {
            window.console && console.log({
              scrollHeight: container.prop('scrollHeight') + ':' + scroll.scrolly.size,
              scrollWidth: container.prop('scrollWidth') + ':' + scroll.scrollx.size,
              visibleHeight: wrapper.height() + ':' + scroll.scrolly.visible,
              visibleWidth: wrapper.width() + ':' + scroll.scrollx.visible
            }, true);
            timerCounter++;
          }
        }
      }
      if (debug && timerCounter > 10) {
        window.console && console.log('Scroll updates exceed 10');
        updateScrollbars = function () {};
      } else {
        clearTimeout(timer);
        timer = setTimeout(updateScrollbars, 300);
      }
    };
  })();

  /* ADDITIONAL FUNCTIONS */
  /**
   * Get native browser scrollbar size (height/width)
   *
   * @param {Boolean} actual size or CSS size, default - CSS size
   * @returns {Object} with height, width
   */
  function getBrowserScrollSize(actualSize) {

    if (browser.webkit && !actualSize) {
      return {
        "height": 0,
        "width": 0
      };
    }

    if (!browser.data.outer) {
      var css = {
        "border": "none",
        "box-sizing": "content-box",
        "height": "200px",
        "margin": "0",
        "padding": "0",
        "width": "200px"
      };
      browser.data.inner = $("<div>").css($.extend({}, css));
      browser.data.outer = $("<div>").css($.extend({
        "left": "-1000px",
        "overflow": "scroll",
        "position": "absolute",
        "top": "-1000px"
      }, css)).append(browser.data.inner).appendTo("body");
    }

    browser.data.outer.scrollLeft(1000).scrollTop(1000);

    return {
      "height": Math.ceil((browser.data.outer.offset().top - browser.data.inner.offset().top) || 0),
      "width": Math.ceil((browser.data.outer.offset().left - browser.data.inner.offset().left) || 0)
    };
  }

  /**
   * Check if native browser scrollbars overlay content
   *
   * @returns {Boolean}
   */
  function isScrollOverlaysContent() {
    var scrollSize = getBrowserScrollSize(true);
    return !(scrollSize.height || scrollSize.width);
  }

  function isVerticalScroll(event) {
    var e = event.originalEvent;
    if (e.axis && e.axis === e.HORIZONTAL_AXIS)
      return false;
    if (e.wheelDeltaX)
      return false;
    return true;
  }


  /**
   * Extend AngularJS as UI directive
   * and expose a provider for override default config
   *
   */
  if (window.angular) {
    (function (angular) {
      angular.module('jQueryScrollbar', [])
        .provider('jQueryScrollbar', function () {
          var defaultOptions = defaults;
          return {
            setOptions: function (options) {
              angular.extend(defaultOptions, options);
            },
            $get: function () {
              return {
                options: angular.copy(defaultOptions)
              };
            }
          };
        })
        .directive('jqueryScrollbar', ['jQueryScrollbar', '$parse', function (jQueryScrollbar, $parse) {
          return {
            "restrict": "AC",
            "link": function (scope, element, attrs) {
              var model = $parse(attrs.jqueryScrollbar),
                options = model(scope);
              element.scrollbar(options || jQueryScrollbar.options)
                .on('$destroy', function () {
                  element.scrollbar('destroy');
                });
            }
          };
        }]);
    })(window.angular);
  }
}));










/*** jquery.BlackAndWhite.js ***/
/**
 *
 * Version: 0.2.8
 * Author:  Gianluca Guarini
 * Contact: gianluca.guarini@gmail.com
 * Website: http://www.gianlucaguarini.com/
 * Twitter: @gianlucaguarini
 *
 * Copyright (c) 2013 Gianluca Guarini
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 **/
!(function($) {
  $.fn.extend({
    BlackAndWhite: function(options) {
      'use strict';
      var $container = this,
        defaults = {
          hoverEffect: false,
          webworkerPath: false,
          responsive: false,
          invertHoverEffect: false,
          speed: 500,
          onImageReady: null,
          intensity: 1
        };
      options = $.extend(defaults, options);

      /**
       *
       * Public vars
       *
       */
      var hoverEffect = options.hoverEffect,
        webworkerPath = options.webworkerPath,
        invertHoverEffect = options.invertHoverEffect,
        responsive = options.responsive,
        intensity = (typeof options.intensity === 'number' && options.intensity < 1 && options.intensity > 0) ? options.intensity : 1,
        fadeSpeedIn = $.isPlainObject(options.speed) ? options.speed.fadeIn : options.speed,
        fadeSpeedOut = $.isPlainObject(options.speed) ? options.speed.fadeOut : options.speed;

      var isIE7 = (document.all && !window.opera && window.XMLHttpRequest) ? true : false;

      /*
			 *
			 * features detection
			 *
			 */

      var browserPrefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

      var cssPrefixString = {};
      var cssPrefix = function(property) {
        if (cssPrefixString[property] || cssPrefixString[property] === '') return cssPrefixString[property] + property;
        var e = document.createElement('div');
        var prefixes = ['', 'Moz', 'Webkit', 'O', 'ms', 'Khtml']; // Various supports...
        for (var i in prefixes) {
          if (typeof e.style[prefixes[i] + property] !== 'undefined') {
            cssPrefixString[property] = prefixes[i];
            return prefixes[i] + property;
          }
        }
        return property.toLowerCase();
      };


      // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/css-filters.js
      var cssfilters = function() {
        var el = document.createElement('div');
        el.style.cssText = browserPrefixes.join('filter' + ':blur(2px); ');
        return !!el.style.length && ((document.documentMode === undefined || document.documentMode > 9));
      }();
      /**
       *
       * Private vars
       *
       */
      var supportsCanvas = !! document.createElement('canvas').getContext,
        $window = $(window),
        /* Check if Web Workers are supported */
        supportWebworker = (function() {
          return (typeof(Worker) !== "undefined") ? true : false;
        }()),
        cssFilter = cssPrefix('Filter'),
        imagesArray = [],
        BnWWorker = supportWebworker && webworkerPath ? new Worker(webworkerPath + "BnWWorker.js") : false;

      /**
       *
       * Private methods
       *
       */
      var _onMouseLeave = function(e) {
        $(e.currentTarget).find('.BWfade').stop(true, true)[!invertHoverEffect ? 'fadeIn' : 'fadeOut'](fadeSpeedOut);
      };
      var _onMouseEnter = function(e) {
        $(e.currentTarget).find('.BWfade').stop(true, true)[invertHoverEffect ? 'fadeIn' : 'fadeOut'](fadeSpeedIn);
      };
      var _onImageReady = function(img) {
        if (typeof options.onImageReady === 'function')
          options.onImageReady(img);
      };
      // Loop all the images converting them by the webworker (this process is unobstrusive and it does not block the page loading)
      var _webWorkerLoop = function() {
        if (!imagesArray.length) {
          // terminate the worker
          // the standard way - http://www.w3.org/TR/workers/#dedicated-workers-and-the-worker-interface
          if (BnWWorker.terminate)
            BnWWorker.terminate();
          // IE 10 specific - http://msdn.microsoft.com/en-us/library/ie/hh673568(v=vs.85).aspx
          if (BnWWorker.close)
            BnWWorker.close();
          return;
        }

        BnWWorker.postMessage({
          imgData:imagesArray[0].imageData,
          intensity: intensity
        });

        BnWWorker.onmessage = function(event) {
          imagesArray[0].ctx.putImageData(event.data, 0, 0);
          _onImageReady(imagesArray[0].img);
          imagesArray.splice(0, 1);
          _webWorkerLoop();
        };
      };
      //convert any image into B&W using HTML5 canvas
      var _manipulateImage = function(img, canvas, width, height) {
        var ctx = canvas.getContext('2d'),
          currImg = img,
          i = 0,
          grey;

        ctx.drawImage(img, 0, 0, width, height);

        var imageData = ctx.getImageData(0, 0, width, height),
          px = imageData.data,
          length = px.length;

        // web worker superfast implementation
        if (BnWWorker) {

          imagesArray.push({
            imageData: imageData,
            ctx: ctx,
            img: img
          });

        } else {

          // no webworker slow implementation
          for (; i < length; i += 4) {
            var k = px[i] * 0.3 + px[i + 1] * 0.59 + px[i + 2] * 0.11;
            px[i] = ~~ (k * intensity + px[i] * (1 - intensity));
            px[i + 1] = ~~ (k * intensity + px[i + 1] * (1 - intensity));
            px[i + 2] = ~~ (k * intensity + px[i + 2] * (1 - intensity));
          }

          ctx.putImageData(imageData, 0, 0);

          _onImageReady(img);
        }
      };

      var _injectTags = function($img, $imageWrapper) {

        var pic = $img[0],
          src = pic.src,
          width = $img.width(),
          height = $img.height(),
          position = $img.position(),
          css = {
            'position': 'absolute',
            top: position.top,
            left: position.left,
            display: invertHoverEffect ? 'none' : 'block'
          };
        if (supportsCanvas && !cssfilters) {

          var realWidth = pic.width,
            realHeight = pic.height;

          //adding the canvas
          $('<canvas class="BWfade" width="' + realWidth + '" height="' + realHeight + '"></canvas>').prependTo($imageWrapper);
          //getting the canvas
          var $canvas = $imageWrapper.find('canvas');
          //setting the canvas position on the Pics
          $canvas.css(css);

          _manipulateImage(pic, $canvas[0], realWidth, realHeight);

        } else {

          css[cssPrefix('Filter')] = 'grayscale(' + intensity * 100 + '%)';
          //adding the canvas
          $('<img src=' + src + ' width="' + width + '" height="' + height + '" class="BWFilter BWfade" /> ').prependTo($imageWrapper);
          $('.BWFilter').css($.extend(css, {
            'filter': 'progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)'
          }));

          _onImageReady(pic);
        }
      };
      this.init = function(options) {
        // convert all the images
        $container.each(function(index, tmpImageWrapper) {
          var $imageWrapper = $(tmpImageWrapper),
            $pic = $imageWrapper.find('img');

          if (!$pic.width())
            $pic.on("load", function() {
              _injectTags($pic, $imageWrapper);
            });
          else
            _injectTags($pic, $imageWrapper);
        });
        // start the webworker
        if (BnWWorker) {
          // web worker implementation
          _webWorkerLoop();
        }
        // binding the hover effect
        if (hoverEffect) {

          $container.on('mouseleave', _onMouseLeave);
          $container.on('mouseenter', _onMouseEnter);
        }
        // make it responsive
        if (responsive) {
          $window.on('resize orientationchange', $container.resizeImages);
        }
      };

      this.resizeImages = function() {

        $container.each(function(index, currImageWrapper) {
          var pic = $(currImageWrapper).find('img:not(.BWFilter)'),
            currWidth = isIE7 ? $(pic).prop('width') : $(pic).width(),
            currHeight = isIE7 ? $(pic).prop('height') : $(pic).height();

          $(this).find('.BWFilter, canvas').css({
            width: currWidth,
            height: currHeight
          });

        });
      };

      return this.init(options);

    }

  });
}(jQuery));








/*** jQuery carouFredSel 6.2.1.js ***/
/*
 *	jQuery carouFredSel 6.2.1
 *	Demo's and documentation:
 *	caroufredsel.dev7studios.com
 *
 *	Copyright (c) 2013 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


(function($) {


  //	LOCAL

  if ( $.fn.carouFredSel )
  {
    return;
  }

  $.fn.caroufredsel = $.fn.carouFredSel = function(options, configs)
  {

    //	no element
    if (this.length == 0)
    {
      debug( true, 'No element found for "' + this.selector + '".' );
      return this;
    }

    //	multiple elements
    if (this.length > 1)
    {
      return this.each(function() {
        $(this).carouFredSel(options, configs);
      });
    }


    var $cfs = this,
      $tt0 = this[0],
      starting_position = false;

    if ($cfs.data('_cfs_isCarousel'))
    {
      starting_position = $cfs.triggerHandler('_cfs_triggerEvent', 'currentPosition');
      $cfs.trigger('_cfs_triggerEvent', ['destroy', true]);
    }

    var FN = {};

    FN._init = function(o, setOrig, start)
    {
      o = go_getObject($tt0, o);

      o.items = go_getItemsObject($tt0, o.items);
      o.scroll = go_getScrollObject($tt0, o.scroll);
      o.auto = go_getAutoObject($tt0, o.auto);
      o.prev = go_getPrevNextObject($tt0, o.prev);
      o.next = go_getPrevNextObject($tt0, o.next);
      o.pagination = go_getPaginationObject($tt0, o.pagination);
      o.swipe = go_getSwipeObject($tt0, o.swipe);
      o.mousewheel = go_getMousewheelObject($tt0, o.mousewheel);

      if (setOrig)
      {
        opts_orig = $.extend(true, {}, $.fn.carouFredSel.defaults, o);
      }

      opts = $.extend(true, {}, $.fn.carouFredSel.defaults, o);
      opts.d = cf_getDimensions(opts);

      crsl.direction = (opts.direction == 'up' || opts.direction == 'left') ? 'next' : 'prev';

      var	a_itm = $cfs.children(),
        avail_primary = ms_getParentSize($wrp, opts, 'width');

      if (is_true(opts.cookie))
      {
        opts.cookie = 'caroufredsel_cookie_' + conf.serialNumber;
      }

      opts.maxDimension = ms_getMaxDimension(opts, avail_primary);

      //	complement items and sizes
      opts.items = in_complementItems(opts.items, opts, a_itm, start);
      opts[opts.d['width']] = in_complementPrimarySize(opts[opts.d['width']], opts, a_itm);
      opts[opts.d['height']] = in_complementSecondarySize(opts[opts.d['height']], opts, a_itm);

      //	primary size not set for a responsive carousel
      if (opts.responsive)
      {
        if (!is_percentage(opts[opts.d['width']]))
        {
          opts[opts.d['width']] = '100%';
        }
      }

      //	primary size is percentage
      if (is_percentage(opts[opts.d['width']]))
      {
        crsl.upDateOnWindowResize = true;
        crsl.primarySizePercentage = opts[opts.d['width']];
        opts[opts.d['width']] = ms_getPercentage(avail_primary, crsl.primarySizePercentage);
        if (!opts.items.visible)
        {
          opts.items.visibleConf.variable = true;
        }
      }

      if (opts.responsive)
      {
        opts.usePadding = false;
        opts.padding = [0, 0, 0, 0];
        opts.align = false;
        opts.items.visibleConf.variable = false;
      }
      else
      {
        //	visible-items not set
        if (!opts.items.visible)
        {
          opts = in_complementVisibleItems(opts, avail_primary);
        }

        //	primary size not set -> calculate it or set to "variable"
        if (!opts[opts.d['width']])
        {
          if (!opts.items.visibleConf.variable && is_number(opts.items[opts.d['width']]) && opts.items.filter == '*')
          {
            opts[opts.d['width']] = opts.items.visible * opts.items[opts.d['width']];
            opts.align = false;
          }
          else
          {
            opts[opts.d['width']] = 'variable';
          }
        }
        //	align not set -> set to center if primary size is number
        if (is_undefined(opts.align))
        {
          opts.align = (is_number(opts[opts.d['width']]))
            ? 'center'
            : false;
        }
        //	set variabe visible-items
        if (opts.items.visibleConf.variable)
        {
          opts.items.visible = gn_getVisibleItemsNext(a_itm, opts, 0);
        }
      }

      //	set visible items by filter
      if (opts.items.filter != '*' && !opts.items.visibleConf.variable)
      {
        opts.items.visibleConf.org = opts.items.visible;
        opts.items.visible = gn_getVisibleItemsNextFilter(a_itm, opts, 0);
      }

      opts.items.visible = cf_getItemsAdjust(opts.items.visible, opts, opts.items.visibleConf.adjust, $tt0);
      opts.items.visibleConf.old = opts.items.visible;

      if (opts.responsive)
      {
        if (!opts.items.visibleConf.min)
        {
          opts.items.visibleConf.min = opts.items.visible;
        }
        if (!opts.items.visibleConf.max)
        {
          opts.items.visibleConf.max = opts.items.visible;
        }
        opts = in_getResponsiveValues(opts, a_itm, avail_primary);
      }
      else
      {
        opts.padding = cf_getPadding(opts.padding);

        if (opts.align == 'top')
        {
          opts.align = 'left';
        }
        else if (opts.align == 'bottom')
        {
          opts.align = 'right';
        }

        switch (opts.align)
        {
          //	align: center, left or right
          case 'center':
          case 'left':
          case 'right':
            if (opts[opts.d['width']] != 'variable')
            {
              opts = in_getAlignPadding(opts, a_itm);
              opts.usePadding = true;
            }
            break;

          //	padding
          default:
            opts.align = false;
            opts.usePadding = (
              opts.padding[0] == 0 &&
              opts.padding[1] == 0 &&
              opts.padding[2] == 0 &&
              opts.padding[3] == 0
            ) ? false : true;
            break;
        }
      }

      if (!is_number(opts.scroll.duration))
      {
        opts.scroll.duration = 500;
      }
      if (is_undefined(opts.scroll.items))
      {
        opts.scroll.items = (opts.responsive || opts.items.visibleConf.variable || opts.items.filter != '*')
          ? 'visible'
          : opts.items.visible;
      }

      opts.auto = $.extend(true, {}, opts.scroll, opts.auto);
      opts.prev = $.extend(true, {}, opts.scroll, opts.prev);
      opts.next = $.extend(true, {}, opts.scroll, opts.next);
      opts.pagination = $.extend(true, {}, opts.scroll, opts.pagination);
      //	swipe and mousewheel extend later on, per direction

      opts.auto = go_complementAutoObject($tt0, opts.auto);
      opts.prev = go_complementPrevNextObject($tt0, opts.prev);
      opts.next = go_complementPrevNextObject($tt0, opts.next);
      opts.pagination = go_complementPaginationObject($tt0, opts.pagination);
      opts.swipe = go_complementSwipeObject($tt0, opts.swipe);
      opts.mousewheel = go_complementMousewheelObject($tt0, opts.mousewheel);

      if (opts.synchronise)
      {
        opts.synchronise = cf_getSynchArr(opts.synchronise);
      }


      //	DEPRECATED
      if (opts.auto.onPauseStart)
      {
        opts.auto.onTimeoutStart = opts.auto.onPauseStart;
        deprecated('auto.onPauseStart', 'auto.onTimeoutStart');
      }
      if (opts.auto.onPausePause)
      {
        opts.auto.onTimeoutPause = opts.auto.onPausePause;
        deprecated('auto.onPausePause', 'auto.onTimeoutPause');
      }
      if (opts.auto.onPauseEnd)
      {
        opts.auto.onTimeoutEnd = opts.auto.onPauseEnd;
        deprecated('auto.onPauseEnd', 'auto.onTimeoutEnd');
      }
      if (opts.auto.pauseDuration)
      {
        opts.auto.timeoutDuration = opts.auto.pauseDuration;
        deprecated('auto.pauseDuration', 'auto.timeoutDuration');
      }
      //	/DEPRECATED


    };	//	/init


    FN._build = function() {
      $cfs.data('_cfs_isCarousel', true);

      var a_itm = $cfs.children(),
        orgCSS = in_mapCss($cfs, ['textAlign', 'float', 'position', 'top', 'right', 'bottom', 'left', 'zIndex', 'width', 'height', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft']),
        newPosition = 'relative';

      switch (orgCSS.position)
      {
        case 'absolute':
        case 'fixed':
          newPosition = orgCSS.position;
          break;
      }

      if (conf.wrapper == 'parent')
      {
        sz_storeOrigCss($wrp);
      }
      else
      {
        $wrp.css(orgCSS);
      }
      $wrp.css({
        'overflow'		: 'hidden',
        'position'		: newPosition
      });

      sz_storeOrigCss($cfs);
      $cfs.data('_cfs_origCssZindex', orgCSS.zIndex);
      $cfs.css({
        'textAlign'		: 'left',
        'float'			: 'none',

        'position'		: 'absolute',
        'top'			: 0,
        'right'			: 'auto',
        'bottom'		: 'auto',
        'left'			: 0,
        'marginTop'		: 0,
        'marginRight'	: 0,
        'marginBottom'	: 0,
        'marginLeft'	: 0
      });

      sz_storeMargin(a_itm, opts);
      sz_storeOrigCss(a_itm);
      if (opts.responsive)
      {
        sz_setResponsiveSizes(opts, a_itm);
      }

    };	//	/build


    FN._bind_events = function() {
      FN._unbind_events();


      //	stop event
      $cfs.bind(cf_e('stop', conf), function(e, imm) {
        e.stopPropagation();

        //	button
        if (!crsl.isStopped)
        {
          if (opts.auto.button)
          {
            opts.auto.button.addClass(cf_c('stopped', conf));
          }
        }

        //	set stopped
        crsl.isStopped = true;

        if (opts.auto.play)
        {
          opts.auto.play = false;
          $cfs.trigger(cf_e('pause', conf), imm);
        }
        return true;
      });


      //	finish event
      $cfs.bind(cf_e('finish', conf), function(e) {
        e.stopPropagation();
        if (crsl.isScrolling)
        {
          sc_stopScroll(scrl);
        }
        return true;
      });


      //	pause event
      $cfs.bind(cf_e('pause', conf), function(e, imm, res) {
        e.stopPropagation();
        tmrs = sc_clearTimers(tmrs);

        //	immediately pause
        if (imm && crsl.isScrolling)
        {
          scrl.isStopped = true;
          var nst = getTime() - scrl.startTime;
          scrl.duration -= nst;
          if (scrl.pre)
          {
            scrl.pre.duration -= nst;
          }
          if (scrl.post)
          {
            scrl.post.duration -= nst;
          }
          sc_stopScroll(scrl, false);
        }

        //	update remaining pause-time
        if (!crsl.isPaused && !crsl.isScrolling)
        {
          if (res)
          {
            tmrs.timePassed += getTime() - tmrs.startTime;
          }
        }

        //	button
        if (!crsl.isPaused)
        {
          if (opts.auto.button)
          {
            opts.auto.button.addClass(cf_c('paused', conf));
          }
        }

        //	set paused
        crsl.isPaused = true;

        //	pause pause callback
        if (opts.auto.onTimeoutPause)
        {
          var dur1 = opts.auto.timeoutDuration - tmrs.timePassed,
            perc = 100 - Math.ceil( dur1 * 100 / opts.auto.timeoutDuration );

          opts.auto.onTimeoutPause.call($tt0, perc, dur1);
        }
        return true;
      });


      //	play event
      $cfs.bind(cf_e('play', conf), function(e, dir, del, res) {
        e.stopPropagation();
        tmrs = sc_clearTimers(tmrs);

        //	sort params
        var v = [dir, del, res],
          t = ['string', 'number', 'boolean'],
          a = cf_sortParams(v, t);

        dir = a[0];
        del = a[1];
        res = a[2];

        if (dir != 'prev' && dir != 'next')
        {
          dir = crsl.direction;
        }
        if (!is_number(del))
        {
          del = 0;
        }
        if (!is_boolean(res))
        {
          res = false;
        }

        //	stopped?
        if (res)
        {
          crsl.isStopped = false;
          opts.auto.play = true;
        }
        if (!opts.auto.play)
        {
          e.stopImmediatePropagation();
          return debug(conf, 'Carousel stopped: Not scrolling.');
        }

        //	button
        if (crsl.isPaused)
        {
          if (opts.auto.button)
          {
            opts.auto.button.removeClass(cf_c('stopped', conf));
            opts.auto.button.removeClass(cf_c('paused', conf));
          }
        }

        //	set playing
        crsl.isPaused = false;
        tmrs.startTime = getTime();

        //	timeout the scrolling
        var dur1 = opts.auto.timeoutDuration + del;
        dur2 = dur1 - tmrs.timePassed;
        perc = 100 - Math.ceil(dur2 * 100 / dur1);

        if (opts.auto.progress)
        {
          tmrs.progress = setInterval(function() {
            var pasd = getTime() - tmrs.startTime + tmrs.timePassed,
              perc = Math.ceil(pasd * 100 / dur1);
            opts.auto.progress.updater.call(opts.auto.progress.bar[0], perc);
          }, opts.auto.progress.interval);
        }

        tmrs.auto = setTimeout(function() {
          if (opts.auto.progress)
          {
            opts.auto.progress.updater.call(opts.auto.progress.bar[0], 100);
          }
          if (opts.auto.onTimeoutEnd)
          {
            opts.auto.onTimeoutEnd.call($tt0, perc, dur2);
          }
          if (crsl.isScrolling)
          {
            $cfs.trigger(cf_e('play', conf), dir);
          }
          else
          {
            $cfs.trigger(cf_e(dir, conf), opts.auto);
          }
        }, dur2);

        //	pause start callback
        if (opts.auto.onTimeoutStart)
        {
          opts.auto.onTimeoutStart.call($tt0, perc, dur2);
        }

        return true;
      });


      //	resume event
      $cfs.bind(cf_e('resume', conf), function(e) {
        e.stopPropagation();
        if (scrl.isStopped)
        {
          scrl.isStopped = false;
          crsl.isPaused = false;
          crsl.isScrolling = true;
          scrl.startTime = getTime();
          sc_startScroll(scrl, conf);
        }
        else
        {
          $cfs.trigger(cf_e('play', conf));
        }
        return true;
      });


      //	prev + next events
      $cfs.bind(cf_e('prev', conf)+' '+cf_e('next', conf), function(e, obj, num, clb, que) {
        e.stopPropagation();

        //	stopped or hidden carousel, don't scroll, don't queue
        if (crsl.isStopped || $cfs.is(':hidden'))
        {
          e.stopImmediatePropagation();
          return debug(conf, 'Carousel stopped or hidden: Not scrolling.');
        }

        //	not enough items
        var minimum = (is_number(opts.items.minimum)) ? opts.items.minimum : opts.items.visible + 1;
        if (minimum > itms.total)
        {
          e.stopImmediatePropagation();
          return debug(conf, 'Not enough items ('+itms.total+' total, '+minimum+' needed): Not scrolling.');
        }

        //	get config
        var v = [obj, num, clb, que],
          t = ['object', 'number/string', 'function', 'boolean'],
          a = cf_sortParams(v, t);

        obj = a[0];
        num = a[1];
        clb = a[2];
        que = a[3];

        var eType = e.type.slice(conf.events.prefix.length);

        if (!is_object(obj))
        {
          obj = {};
        }
        if (is_function(clb))
        {
          obj.onAfter = clb;
        }
        if (is_boolean(que))
        {
          obj.queue = que;
        }
        obj = $.extend(true, {}, opts[eType], obj);

        //	test conditions callback
        if (obj.conditions && !obj.conditions.call($tt0, eType))
        {
          e.stopImmediatePropagation();
          return debug(conf, 'Callback "conditions" returned false.');
        }

        if (!is_number(num))
        {
          if (opts.items.filter != '*')
          {
            num = 'visible';
          }
          else
          {
            var arr = [num, obj.items, opts[eType].items];
            for (var a = 0, l = arr.length; a < l; a++)
            {
              if (is_number(arr[a]) || arr[a] == 'page' || arr[a] == 'visible') {
                num = arr[a];
                break;
              }
            }
          }
          switch(num) {
            case 'page':
              e.stopImmediatePropagation();
              return $cfs.triggerHandler(cf_e(eType+'Page', conf), [obj, clb]);
              break;

            case 'visible':
              if (!opts.items.visibleConf.variable && opts.items.filter == '*')
              {
                num = opts.items.visible;
              }
              break;
          }
        }

        //	resume animation, add current to queue
        if (scrl.isStopped)
        {
          $cfs.trigger(cf_e('resume', conf));
          $cfs.trigger(cf_e('queue', conf), [eType, [obj, num, clb]]);
          e.stopImmediatePropagation();
          return debug(conf, 'Carousel resumed scrolling.');
        }

        //	queue if scrolling
        if (obj.duration > 0)
        {
          if (crsl.isScrolling)
          {
            if (obj.queue)
            {
              if (obj.queue == 'last')
              {
                queu = [];
              }
              if (obj.queue != 'first' || queu.length == 0)
              {
                $cfs.trigger(cf_e('queue', conf), [eType, [obj, num, clb]]);
              }
            }
            e.stopImmediatePropagation();
            return debug(conf, 'Carousel currently scrolling.');
          }
        }

        tmrs.timePassed = 0;
        $cfs.trigger(cf_e('slide_'+eType, conf), [obj, num]);

        //	synchronise
        if (opts.synchronise)
        {
          var s = opts.synchronise,
            c = [obj, num];

          for (var j = 0, l = s.length; j < l; j++) {
            var d = eType;
            if (!s[j][2])
            {
              d = (d == 'prev') ? 'next' : 'prev';
            }
            if (!s[j][1])
            {
              c[0] = s[j][0].triggerHandler('_cfs_triggerEvent', ['configuration', d]);
            }
            c[1] = num + s[j][3];
            s[j][0].trigger('_cfs_triggerEvent', ['slide_'+d, c]);
          }
        }
        return true;
      });


      //	prev event
      $cfs.bind(cf_e('slide_prev', conf), function(e, sO, nI) {
        e.stopPropagation();
        var a_itm = $cfs.children();

        //	non-circular at start, scroll to end
        if (!opts.circular)
        {
          if (itms.first == 0)
          {
            if (opts.infinite)
            {
              $cfs.trigger(cf_e('next', conf), itms.total-1);
            }
            return e.stopImmediatePropagation();
          }
        }

        sz_resetMargin(a_itm, opts);

        //	find number of items to scroll
        if (!is_number(nI))
        {
          if (opts.items.visibleConf.variable)
          {
            nI = gn_getVisibleItemsPrev(a_itm, opts, itms.total-1);
          }
          else if (opts.items.filter != '*')
          {
            var xI = (is_number(sO.items)) ? sO.items : gn_getVisibleOrg($cfs, opts);
            nI = gn_getScrollItemsPrevFilter(a_itm, opts, itms.total-1, xI);
          }
          else
          {
            nI = opts.items.visible;
          }
          nI = cf_getAdjust(nI, opts, sO.items, $tt0);
        }

        //	prevent non-circular from scrolling to far
        if (!opts.circular)
        {
          if (itms.total - nI < itms.first)
          {
            nI = itms.total - itms.first;
          }
        }

        //	set new number of visible items
        opts.items.visibleConf.old = opts.items.visible;
        if (opts.items.visibleConf.variable)
        {
          var vI = cf_getItemsAdjust(gn_getVisibleItemsNext(a_itm, opts, itms.total-nI), opts, opts.items.visibleConf.adjust, $tt0);
          if (opts.items.visible+nI <= vI && nI < itms.total)
          {
            nI++;
            vI = cf_getItemsAdjust(gn_getVisibleItemsNext(a_itm, opts, itms.total-nI), opts, opts.items.visibleConf.adjust, $tt0);
          }
          opts.items.visible = vI;
        }
        else if (opts.items.filter != '*')
        {
          var vI = gn_getVisibleItemsNextFilter(a_itm, opts, itms.total-nI);
          opts.items.visible = cf_getItemsAdjust(vI, opts, opts.items.visibleConf.adjust, $tt0);
        }

        sz_resetMargin(a_itm, opts, true);

        //	scroll 0, don't scroll
        if (nI == 0)
        {
          e.stopImmediatePropagation();
          return debug(conf, '0 items to scroll: Not scrolling.');
        }
        debug(conf, 'Scrolling '+nI+' items backward.');


        //	save new config
        itms.first += nI;
        while (itms.first >= itms.total)
        {
          itms.first -= itms.total;
        }

        //	non-circular callback
        if (!opts.circular)
        {
          if (itms.first == 0 && sO.onEnd)
          {
            sO.onEnd.call($tt0, 'prev');
          }
          if (!opts.infinite)
          {
            nv_enableNavi(opts, itms.first, conf);
          }
        }

        //	rearrange items
        $cfs.children().slice(itms.total-nI, itms.total).prependTo($cfs);
        if (itms.total < opts.items.visible + nI)
        {
          $cfs.children().slice(0, (opts.items.visible+nI)-itms.total).clone(true).appendTo($cfs);
        }

        //	the needed items
        var a_itm = $cfs.children(),
          i_old = gi_getOldItemsPrev(a_itm, opts, nI),
          i_new = gi_getNewItemsPrev(a_itm, opts),
          i_cur_l = a_itm.eq(nI-1),
          i_old_l = i_old.last(),
          i_new_l = i_new.last();

        sz_resetMargin(a_itm, opts);

        var pL = 0,
          pR = 0;

        if (opts.align)
        {
          var p = cf_getAlignPadding(i_new, opts);
          pL = p[0];
          pR = p[1];
        }
        var oL = (pL < 0) ? opts.padding[opts.d[3]] : 0;

        //	hide items for fx directscroll
        var hiddenitems = false,
          i_skp = $();
        if (opts.items.visible < nI)
        {
          i_skp = a_itm.slice(opts.items.visibleConf.old, nI);
          if (sO.fx == 'directscroll')
          {
            var orgW = opts.items[opts.d['width']];
            hiddenitems = i_skp;
            i_cur_l = i_new_l;
            sc_hideHiddenItems(hiddenitems);
            opts.items[opts.d['width']] = 'variable';
          }
        }

        //	save new sizes
        var $cf2 = false,
          i_siz = ms_getTotalSize(a_itm.slice(0, nI), opts, 'width'),
          w_siz = cf_mapWrapperSizes(ms_getSizes(i_new, opts, true), opts, !opts.usePadding),
          i_siz_vis = 0,
          a_cfs = {},
          a_wsz = {},
          a_cur = {},
          a_old = {},
          a_new = {},
          a_lef = {},
          a_lef_vis = {},
          a_dur = sc_getDuration(sO, opts, nI, i_siz);

        switch(sO.fx)
        {
          case 'cover':
          case 'cover-fade':
            i_siz_vis = ms_getTotalSize(a_itm.slice(0, opts.items.visible), opts, 'width');
            break;
        }

        if (hiddenitems)
        {
          opts.items[opts.d['width']] = orgW;
        }

        sz_resetMargin(a_itm, opts, true);
        if (pR >= 0)
        {
          sz_resetMargin(i_old_l, opts, opts.padding[opts.d[1]]);
        }
        if (pL >= 0)
        {
          sz_resetMargin(i_cur_l, opts, opts.padding[opts.d[3]]);
        }

        if (opts.align)
        {
          opts.padding[opts.d[1]] = pR;
          opts.padding[opts.d[3]] = pL;
        }

        a_lef[opts.d['left']] = -(i_siz - oL);
        a_lef_vis[opts.d['left']] = -(i_siz_vis - oL);
        a_wsz[opts.d['left']] = w_siz[opts.d['width']];

        //	scrolling functions
        var _s_wrapper = function() {},
          _a_wrapper = function() {},
          _s_paddingold = function() {},
          _a_paddingold = function() {},
          _s_paddingnew = function() {},
          _a_paddingnew = function() {},
          _s_paddingcur = function() {},
          _a_paddingcur = function() {},
          _onafter = function() {},
          _moveitems = function() {},
          _position = function() {};

        //	clone carousel
        switch(sO.fx)
        {
          case 'crossfade':
          case 'cover':
          case 'cover-fade':
          case 'uncover':
          case 'uncover-fade':
            $cf2 = $cfs.clone(true).appendTo($wrp);
            break;
        }
        switch(sO.fx)
        {
          case 'crossfade':
          case 'uncover':
          case 'uncover-fade':
            $cf2.children().slice(0, nI).remove();
            $cf2.children().slice(opts.items.visibleConf.old).remove();
            break;

          case 'cover':
          case 'cover-fade':
            $cf2.children().slice(opts.items.visible).remove();
            $cf2.css(a_lef_vis);
            break;
        }

        $cfs.css(a_lef);

        //	reset all scrolls
        scrl = sc_setScroll(a_dur, sO.easing, conf);

        //	animate / set carousel
        a_cfs[opts.d['left']] = (opts.usePadding) ? opts.padding[opts.d[3]] : 0;

        //	animate / set wrapper
        if (opts[opts.d['width']] == 'variable' || opts[opts.d['height']] == 'variable')
        {
          _s_wrapper = function() {
            $wrp.css(w_siz);
          };
          _a_wrapper = function() {
            scrl.anims.push([$wrp, w_siz]);
          };
        }

        //	animate / set items
        if (opts.usePadding)
        {
          if (i_new_l.not(i_cur_l).length)
          {
            a_cur[opts.d['marginRight']] = i_cur_l.data('_cfs_origCssMargin');

            if (pL < 0)
            {
              i_cur_l.css(a_cur);
            }
            else
            {
              _s_paddingcur = function() {
                i_cur_l.css(a_cur);
              };
              _a_paddingcur = function() {
                scrl.anims.push([i_cur_l, a_cur]);
              };
            }
          }
          switch(sO.fx)
          {
            case 'cover':
            case 'cover-fade':
              $cf2.children().eq(nI-1).css(a_cur);
              break;
          }

          if (i_new_l.not(i_old_l).length)
          {
            a_old[opts.d['marginRight']] = i_old_l.data('_cfs_origCssMargin');
            _s_paddingold = function() {
              i_old_l.css(a_old);
            };
            _a_paddingold = function() {
              scrl.anims.push([i_old_l, a_old]);
            };
          }

          if (pR >= 0)
          {
            a_new[opts.d['marginRight']] = i_new_l.data('_cfs_origCssMargin') + opts.padding[opts.d[1]];
            _s_paddingnew = function() {
              i_new_l.css(a_new);
            };
            _a_paddingnew = function() {
              scrl.anims.push([i_new_l, a_new]);
            };
          }
        }

        //	set position
        _position = function() {
          $cfs.css(a_cfs);
        };


        var overFill = opts.items.visible+nI-itms.total;

        //	rearrange items
        _moveitems = function() {
          if (overFill > 0)
          {
            $cfs.children().slice(itms.total).remove();
            i_old = $( $cfs.children().slice(itms.total-(opts.items.visible-overFill)).get().concat( $cfs.children().slice(0, overFill).get() ) );
          }
          sc_showHiddenItems(hiddenitems);

          if (opts.usePadding)
          {
            var l_itm = $cfs.children().eq(opts.items.visible+nI-1);
            l_itm.css(opts.d['marginRight'], l_itm.data('_cfs_origCssMargin'));
          }
        };


        var cb_arguments = sc_mapCallbackArguments(i_old, i_skp, i_new, nI, 'prev', a_dur, w_siz);

        //	fire onAfter callbacks
        _onafter = function() {
          sc_afterScroll($cfs, $cf2, sO);
          crsl.isScrolling = false;
          clbk.onAfter = sc_fireCallbacks($tt0, sO, 'onAfter', cb_arguments, clbk);
          queu = sc_fireQueue($cfs, queu, conf);

          if (!crsl.isPaused)
          {
            $cfs.trigger(cf_e('play', conf));
          }
        };

        //	fire onBefore callback
        crsl.isScrolling = true;
        tmrs = sc_clearTimers(tmrs);
        clbk.onBefore = sc_fireCallbacks($tt0, sO, 'onBefore', cb_arguments, clbk);

        switch(sO.fx)
        {
          case 'none':
            $cfs.css(a_cfs);
            _s_wrapper();
            _s_paddingold();
            _s_paddingnew();
            _s_paddingcur();
            _position();
            _moveitems();
            _onafter();
            break;

          case 'fade':
            scrl.anims.push([$cfs, { 'opacity': 0 }, function() {
              _s_wrapper();
              _s_paddingold();
              _s_paddingnew();
              _s_paddingcur();
              _position();
              _moveitems();
              scrl = sc_setScroll(a_dur, sO.easing, conf);
              scrl.anims.push([$cfs, { 'opacity': 1 }, _onafter]);
              sc_startScroll(scrl, conf);
            }]);
            break;

          case 'crossfade':
            $cfs.css({ 'opacity': 0 });
            scrl.anims.push([$cf2, { 'opacity': 0 }]);
            scrl.anims.push([$cfs, { 'opacity': 1 }, _onafter]);
            _a_wrapper();
            _s_paddingold();
            _s_paddingnew();
            _s_paddingcur();
            _position();
            _moveitems();
            break;

          case 'cover':
            scrl.anims.push([$cf2, a_cfs, function() {
              _s_paddingold();
              _s_paddingnew();
              _s_paddingcur();
              _position();
              _moveitems();
              _onafter();
            }]);
            _a_wrapper();
            break;

          case 'cover-fade':
            scrl.anims.push([$cfs, { 'opacity': 0 }]);
            scrl.anims.push([$cf2, a_cfs, function() {
              _s_paddingold();
              _s_paddingnew();
              _s_paddingcur();
              _position();
              _moveitems();
              _onafter();
            }]);
            _a_wrapper();
            break;

          case 'uncover':
            scrl.anims.push([$cf2, a_wsz, _onafter]);
            _a_wrapper();
            _s_paddingold();
            _s_paddingnew();
            _s_paddingcur();
            _position();
            _moveitems();
            break;

          case 'uncover-fade':
            $cfs.css({ 'opacity': 0 });
            scrl.anims.push([$cfs, { 'opacity': 1 }]);
            scrl.anims.push([$cf2, a_wsz, _onafter]);
            _a_wrapper();
            _s_paddingold();
            _s_paddingnew();
            _s_paddingcur();
            _position();
            _moveitems();
            break;

          default:
            scrl.anims.push([$cfs, a_cfs, function() {
              _moveitems();
              _onafter();
            }]);
            _a_wrapper();
            _a_paddingold();
            _a_paddingnew();
            _a_paddingcur();
            break;
        }

        sc_startScroll(scrl, conf);
        cf_setCookie(opts.cookie, $cfs, conf);

        $cfs.trigger(cf_e('updatePageStatus', conf), [false, w_siz]);

        return true;
      });


      //	next event
      $cfs.bind(cf_e('slide_next', conf), function(e, sO, nI) {
        e.stopPropagation();
        var a_itm = $cfs.children();

        //	non-circular at end, scroll to start
        if (!opts.circular)
        {
          if (itms.first == opts.items.visible)
          {
            if (opts.infinite)
            {
              $cfs.trigger(cf_e('prev', conf), itms.total-1);
            }
            return e.stopImmediatePropagation();
          }
        }

        sz_resetMargin(a_itm, opts);

        //	find number of items to scroll
        if (!is_number(nI))
        {
          if (opts.items.filter != '*')
          {
            var xI = (is_number(sO.items)) ? sO.items : gn_getVisibleOrg($cfs, opts);
            nI = gn_getScrollItemsNextFilter(a_itm, opts, 0, xI);
          }
          else
          {
            nI = opts.items.visible;
          }
          nI = cf_getAdjust(nI, opts, sO.items, $tt0);
        }

        var lastItemNr = (itms.first == 0) ? itms.total : itms.first;

        //	prevent non-circular from scrolling to far
        if (!opts.circular)
        {
          if (opts.items.visibleConf.variable)
          {
            var vI = gn_getVisibleItemsNext(a_itm, opts, nI),
              xI = gn_getVisibleItemsPrev(a_itm, opts, lastItemNr-1);
          }
          else
          {
            var vI = opts.items.visible,
              xI = opts.items.visible;
          }

          if (nI + vI > lastItemNr)
          {
            nI = lastItemNr - xI;
          }
        }

        //	set new number of visible items
        opts.items.visibleConf.old = opts.items.visible;
        if (opts.items.visibleConf.variable)
        {
          var vI = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(a_itm, opts, nI, lastItemNr), opts, opts.items.visibleConf.adjust, $tt0);
          while (opts.items.visible-nI >= vI && nI < itms.total)
          {
            nI++;
            vI = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(a_itm, opts, nI, lastItemNr), opts, opts.items.visibleConf.adjust, $tt0);
          }
          opts.items.visible = vI;
        }
        else if (opts.items.filter != '*')
        {
          var vI = gn_getVisibleItemsNextFilter(a_itm, opts, nI);
          opts.items.visible = cf_getItemsAdjust(vI, opts, opts.items.visibleConf.adjust, $tt0);
        }

        sz_resetMargin(a_itm, opts, true);

        //	scroll 0, don't scroll
        if (nI == 0)
        {
          e.stopImmediatePropagation();
          return debug(conf, '0 items to scroll: Not scrolling.');
        }
        debug(conf, 'Scrolling '+nI+' items forward.');


        //	save new config
        itms.first -= nI;
        while (itms.first < 0)
        {
          itms.first += itms.total;
        }

        //	non-circular callback
        if (!opts.circular)
        {
          if (itms.first == opts.items.visible && sO.onEnd)
          {
            sO.onEnd.call($tt0, 'next');
          }
          if (!opts.infinite)
          {
            nv_enableNavi(opts, itms.first, conf);
          }
        }

        //	rearrange items
        if (itms.total < opts.items.visible+nI)
        {
          $cfs.children().slice(0, (opts.items.visible+nI)-itms.total).clone(true).appendTo($cfs);
        }

        //	the needed items
        var a_itm = $cfs.children(),
          i_old = gi_getOldItemsNext(a_itm, opts),
          i_new = gi_getNewItemsNext(a_itm, opts, nI),
          i_cur_l = a_itm.eq(nI-1),
          i_old_l = i_old.last(),
          i_new_l = i_new.last();

        sz_resetMargin(a_itm, opts);

        var pL = 0,
          pR = 0;

        if (opts.align)
        {
          var p = cf_getAlignPadding(i_new, opts);
          pL = p[0];
          pR = p[1];
        }

        //	hide items for fx directscroll
        var hiddenitems = false,
          i_skp = $();
        if (opts.items.visibleConf.old < nI)
        {
          i_skp = a_itm.slice(opts.items.visibleConf.old, nI);
          if (sO.fx == 'directscroll')
          {
            var orgW = opts.items[opts.d['width']];
            hiddenitems = i_skp;
            i_cur_l = i_old_l;
            sc_hideHiddenItems(hiddenitems);
            opts.items[opts.d['width']] = 'variable';
          }
        }

        //	save new sizes
        var $cf2 = false,
          i_siz = ms_getTotalSize(a_itm.slice(0, nI), opts, 'width'),
          w_siz = cf_mapWrapperSizes(ms_getSizes(i_new, opts, true), opts, !opts.usePadding),
          i_siz_vis = 0,
          a_cfs = {},
          a_cfs_vis = {},
          a_cur = {},
          a_old = {},
          a_lef = {},
          a_dur = sc_getDuration(sO, opts, nI, i_siz);

        switch(sO.fx)
        {
          case 'uncover':
          case 'uncover-fade':
            i_siz_vis = ms_getTotalSize(a_itm.slice(0, opts.items.visibleConf.old), opts, 'width');
            break;
        }

        if (hiddenitems)
        {
          opts.items[opts.d['width']] = orgW;
        }

        if (opts.align)
        {
          if (opts.padding[opts.d[1]] < 0)
          {
            opts.padding[opts.d[1]] = 0;
          }
        }
        sz_resetMargin(a_itm, opts, true);
        sz_resetMargin(i_old_l, opts, opts.padding[opts.d[1]]);

        if (opts.align)
        {
          opts.padding[opts.d[1]] = pR;
          opts.padding[opts.d[3]] = pL;
        }

        a_lef[opts.d['left']] = (opts.usePadding) ? opts.padding[opts.d[3]] : 0;

        //	scrolling functions
        var _s_wrapper = function() {},
          _a_wrapper = function() {},
          _s_paddingold = function() {},
          _a_paddingold = function() {},
          _s_paddingcur = function() {},
          _a_paddingcur = function() {},
          _onafter = function() {},
          _moveitems = function() {},
          _position = function() {};

        //	clone carousel
        switch(sO.fx)
        {
          case 'crossfade':
          case 'cover':
          case 'cover-fade':
          case 'uncover':
          case 'uncover-fade':
            $cf2 = $cfs.clone(true).appendTo($wrp);
            $cf2.children().slice(opts.items.visibleConf.old).remove();
            break;
        }
        switch(sO.fx)
        {
          case 'crossfade':
          case 'cover':
          case 'cover-fade':
            $cfs.css('zIndex', 1);
            $cf2.css('zIndex', 0);
            break;
        }

        //	reset all scrolls
        scrl = sc_setScroll(a_dur, sO.easing, conf);

        //	animate / set carousel
        a_cfs[opts.d['left']] = -i_siz;
        a_cfs_vis[opts.d['left']] = -i_siz_vis;

        if (pL < 0)
        {
          a_cfs[opts.d['left']] += pL;
        }

        //	animate / set wrapper
        if (opts[opts.d['width']] == 'variable' || opts[opts.d['height']] == 'variable')
        {
          _s_wrapper = function() {
            $wrp.css(w_siz);
          };
          _a_wrapper = function() {
            scrl.anims.push([$wrp, w_siz]);
          };
        }

        //	animate / set items
        if (opts.usePadding)
        {
          var i_new_l_m = i_new_l.data('_cfs_origCssMargin');

          if (pR >= 0)
          {
            i_new_l_m += opts.padding[opts.d[1]];
          }
          i_new_l.css(opts.d['marginRight'], i_new_l_m);

          if (i_cur_l.not(i_old_l).length)
          {
            a_old[opts.d['marginRight']] = i_old_l.data('_cfs_origCssMargin');
          }
          _s_paddingold = function() {
            i_old_l.css(a_old);
          };
          _a_paddingold = function() {
            scrl.anims.push([i_old_l, a_old]);
          };

          var i_cur_l_m = i_cur_l.data('_cfs_origCssMargin');
          if (pL > 0)
          {
            i_cur_l_m += opts.padding[opts.d[3]];
          }

          a_cur[opts.d['marginRight']] = i_cur_l_m;

          _s_paddingcur = function() {
            i_cur_l.css(a_cur);
          };
          _a_paddingcur = function() {
            scrl.anims.push([i_cur_l, a_cur]);
          };
        }

        //	set position
        _position = function() {
          $cfs.css(a_lef);
        };


        var overFill = opts.items.visible+nI-itms.total;

        //	rearrange items
        _moveitems = function() {
          if (overFill > 0)
          {
            $cfs.children().slice(itms.total).remove();
          }
          var l_itm = $cfs.children().slice(0, nI).appendTo($cfs).last();
          if (overFill > 0)
          {
            i_new = gi_getCurrentItems(a_itm, opts);
          }
          sc_showHiddenItems(hiddenitems);

          if (opts.usePadding)
          {
            if (itms.total < opts.items.visible+nI) {
              var i_cur_l = $cfs.children().eq(opts.items.visible-1);
              i_cur_l.css(opts.d['marginRight'], i_cur_l.data('_cfs_origCssMargin') + opts.padding[opts.d[1]]);
            }
            l_itm.css(opts.d['marginRight'], l_itm.data('_cfs_origCssMargin'));
          }
        };


        var cb_arguments = sc_mapCallbackArguments(i_old, i_skp, i_new, nI, 'next', a_dur, w_siz);

        //	fire onAfter callbacks
        _onafter = function() {
          $cfs.css('zIndex', $cfs.data('_cfs_origCssZindex'));
          sc_afterScroll($cfs, $cf2, sO);
          crsl.isScrolling = false;
          clbk.onAfter = sc_fireCallbacks($tt0, sO, 'onAfter', cb_arguments, clbk);
          queu = sc_fireQueue($cfs, queu, conf);

          if (!crsl.isPaused)
          {
            $cfs.trigger(cf_e('play', conf));
          }
        };

        //	fire onBefore callbacks
        crsl.isScrolling = true;
        tmrs = sc_clearTimers(tmrs);
        clbk.onBefore = sc_fireCallbacks($tt0, sO, 'onBefore', cb_arguments, clbk);

        switch(sO.fx)
        {
          case 'none':
            $cfs.css(a_cfs);
            _s_wrapper();
            _s_paddingold();
            _s_paddingcur();
            _position();
            _moveitems();
            _onafter();
            break;

          case 'fade':
            scrl.anims.push([$cfs, { 'opacity': 0 }, function() {
              _s_wrapper();
              _s_paddingold();
              _s_paddingcur();
              _position();
              _moveitems();
              scrl = sc_setScroll(a_dur, sO.easing, conf);
              scrl.anims.push([$cfs, { 'opacity': 1 }, _onafter]);
              sc_startScroll(scrl, conf);
            }]);
            break;

          case 'crossfade':
            $cfs.css({ 'opacity': 0 });
            scrl.anims.push([$cf2, { 'opacity': 0 }]);
            scrl.anims.push([$cfs, { 'opacity': 1 }, _onafter]);
            _a_wrapper();
            _s_paddingold();
            _s_paddingcur();
            _position();
            _moveitems();
            break;

          case 'cover':
            $cfs.css(opts.d['left'], $wrp[opts.d['width']]());
            scrl.anims.push([$cfs, a_lef, _onafter]);
            _a_wrapper();
            _s_paddingold();
            _s_paddingcur();
            _moveitems();
            break;

          case 'cover-fade':
            $cfs.css(opts.d['left'], $wrp[opts.d['width']]());
            scrl.anims.push([$cf2, { 'opacity': 0 }]);
            scrl.anims.push([$cfs, a_lef, _onafter]);
            _a_wrapper();
            _s_paddingold();
            _s_paddingcur();
            _moveitems();
            break;

          case 'uncover':
            scrl.anims.push([$cf2, a_cfs_vis, _onafter]);
            _a_wrapper();
            _s_paddingold();
            _s_paddingcur();
            _position();
            _moveitems();
            break;

          case 'uncover-fade':
            $cfs.css({ 'opacity': 0 });
            scrl.anims.push([$cfs, { 'opacity': 1 }]);
            scrl.anims.push([$cf2, a_cfs_vis, _onafter]);
            _a_wrapper();
            _s_paddingold();
            _s_paddingcur();
            _position();
            _moveitems();
            break;

          default:
            scrl.anims.push([$cfs, a_cfs, function() {
              _position();
              _moveitems();
              _onafter();
            }]);
            _a_wrapper();
            _a_paddingold();
            _a_paddingcur();
            break;
        }

        sc_startScroll(scrl, conf);
        cf_setCookie(opts.cookie, $cfs, conf);

        $cfs.trigger(cf_e('updatePageStatus', conf), [false, w_siz]);

        return true;
      });


      //	slideTo event
      $cfs.bind(cf_e('slideTo', conf), function(e, num, dev, org, obj, dir, clb) {
        e.stopPropagation();

        var v = [num, dev, org, obj, dir, clb],
          t = ['string/number/object', 'number', 'boolean', 'object', 'string', 'function'],
          a = cf_sortParams(v, t);

        obj = a[3];
        dir = a[4];
        clb = a[5];

        num = gn_getItemIndex(a[0], a[1], a[2], itms, $cfs);

        if (num == 0)
        {
          return false;
        }
        if (!is_object(obj))
        {
          obj = false;
        }

        if (dir != 'prev' && dir != 'next')
        {
          if (opts.circular)
          {
            dir = (num <= itms.total / 2) ? 'next' : 'prev';
          }
          else
          {
            dir = (itms.first == 0 || itms.first > num) ? 'next' : 'prev';
          }
        }

        if (dir == 'prev')
        {
          num = itms.total-num;
        }
        $cfs.trigger(cf_e(dir, conf), [obj, num, clb]);

        return true;
      });


      //	prevPage event
      $cfs.bind(cf_e('prevPage', conf), function(e, obj, clb) {
        e.stopPropagation();
        var cur = $cfs.triggerHandler(cf_e('currentPage', conf));
        return $cfs.triggerHandler(cf_e('slideToPage', conf), [cur-1, obj, 'prev', clb]);
      });


      //	nextPage event
      $cfs.bind(cf_e('nextPage', conf), function(e, obj, clb) {
        e.stopPropagation();
        var cur = $cfs.triggerHandler(cf_e('currentPage', conf));
        return $cfs.triggerHandler(cf_e('slideToPage', conf), [cur+1, obj, 'next', clb]);
      });


      //	slideToPage event
      $cfs.bind(cf_e('slideToPage', conf), function(e, pag, obj, dir, clb) {
        e.stopPropagation();
        if (!is_number(pag))
        {
          pag = $cfs.triggerHandler(cf_e('currentPage', conf));
        }
        var ipp = opts.pagination.items || opts.items.visible,
          max = Math.ceil(itms.total / ipp)-1;

        if (pag < 0)
        {
          pag = max;
        }
        if (pag > max)
        {
          pag = 0;
        }
        return $cfs.triggerHandler(cf_e('slideTo', conf), [pag*ipp, 0, true, obj, dir, clb]);
      });

      //	jumpToStart event
      $cfs.bind(cf_e('jumpToStart', conf), function(e, s) {
        e.stopPropagation();
        if (s)
        {
          s = gn_getItemIndex(s, 0, true, itms, $cfs);
        }
        else
        {
          s = 0;
        }

        s += itms.first;
        if (s != 0)
        {
          if (itms.total > 0)
          {
            while (s > itms.total)
            {
              s -= itms.total;
            }
          }
          $cfs.prepend($cfs.children().slice(s, itms.total));
        }
        return true;
      });


      //	synchronise event
      $cfs.bind(cf_e('synchronise', conf), function(e, s) {
        e.stopPropagation();
        if (s)
        {
          s = cf_getSynchArr(s);
        }
        else if (opts.synchronise)
        {
          s = opts.synchronise;
        }
        else
        {
          return debug(conf, 'No carousel to synchronise.');
        }

        var n = $cfs.triggerHandler(cf_e('currentPosition', conf)),
          x = true;

        for (var j = 0, l = s.length; j < l; j++)
        {
          if (!s[j][0].triggerHandler(cf_e('slideTo', conf), [n, s[j][3], true]))
          {
            x = false;
          }
        }
        return x;
      });


      //	queue event
      $cfs.bind(cf_e('queue', conf), function(e, dir, opt) {
        e.stopPropagation();
        if (is_function(dir))
        {
          dir.call($tt0, queu);
        }
        else if (is_array(dir))
        {
          queu = dir;
        }
        else if (!is_undefined(dir))
        {
          queu.push([dir, opt]);
        }
        return queu;
      });


      //	insertItem event
      $cfs.bind(cf_e('insertItem', conf), function(e, itm, num, org, dev) {
        e.stopPropagation();

        var v = [itm, num, org, dev],
          t = ['string/object', 'string/number/object', 'boolean', 'number'],
          a = cf_sortParams(v, t);

        itm = a[0];
        num = a[1];
        org = a[2];
        dev = a[3];

        if (is_object(itm) && !is_jquery(itm))
        {
          itm = $(itm);
        }
        else if (is_string(itm))
        {
          itm = $(itm);
        }
        if (!is_jquery(itm) || itm.length == 0)
        {
          return debug(conf, 'Not a valid object.');
        }

        if (is_undefined(num))
        {
          num = 'end';
        }

        sz_storeMargin(itm, opts);
        sz_storeOrigCss(itm);

        var orgNum = num,
          before = 'before';

        if (num == 'end')
        {
          if (org)
          {
            if (itms.first == 0)
            {
              num = itms.total-1;
              before = 'after';
            }
            else
            {
              num = itms.first;
              itms.first += itm.length;
            }
            if (num < 0)
            {
              num = 0;
            }
          }
          else
          {
            num = itms.total-1;
            before = 'after';
          }
        }
        else
        {
          num = gn_getItemIndex(num, dev, org, itms, $cfs);
        }

        var $cit = $cfs.children().eq(num);
        if ($cit.length)
        {
          $cit[before](itm);
        }
        else
        {
          debug(conf, 'Correct insert-position not found! Appending item to the end.');
          $cfs.append(itm);
        }

        if (orgNum != 'end' && !org)
        {
          if (num < itms.first)
          {
            itms.first += itm.length;
          }
        }
        itms.total = $cfs.children().length;
        if (itms.first >= itms.total)
        {
          itms.first -= itms.total;
        }

        $cfs.trigger(cf_e('updateSizes', conf));
        $cfs.trigger(cf_e('linkAnchors', conf));

        return true;
      });


      //	removeItem event
      $cfs.bind(cf_e('removeItem', conf), function(e, num, org, dev) {
        e.stopPropagation();

        var v = [num, org, dev],
          t = ['string/number/object', 'boolean', 'number'],
          a = cf_sortParams(v, t);

        num = a[0];
        org = a[1];
        dev = a[2];

        var removed = false;

        if (num instanceof $ && num.length > 1)
        {
          $removed = $();
          num.each(function(i, el) {
            var $rem = $cfs.trigger(cf_e('removeItem', conf), [$(this), org, dev]);
            if ( $rem )
            {
              $removed = $removed.add($rem);
            }
          });
          return $removed;
        }

        if (is_undefined(num) || num == 'end')
        {
          $removed = $cfs.children().last();
        }
        else
        {
          num = gn_getItemIndex(num, dev, org, itms, $cfs);
          var $removed = $cfs.children().eq(num);
          if ( $removed.length )
          {
            if (num < itms.first)
            {
              itms.first -= $removed.length;
            }
          }
        }
        if ( $removed && $removed.length )
        {
          $removed.detach();
          itms.total = $cfs.children().length;
          $cfs.trigger(cf_e('updateSizes', conf));
        }

        return $removed;
      });


      //	onBefore and onAfter event
      $cfs.bind(cf_e('onBefore', conf)+' '+cf_e('onAfter', conf), function(e, fn) {
        e.stopPropagation();
        var eType = e.type.slice(conf.events.prefix.length);
        if (is_array(fn))
        {
          clbk[eType] = fn;
        }
        if (is_function(fn))
        {
          clbk[eType].push(fn);
        }
        return clbk[eType];
      });


      //	currentPosition event
      $cfs.bind(cf_e('currentPosition', conf), function(e, fn) {
        e.stopPropagation();
        if (itms.first == 0)
        {
          var val = 0;
        }
        else
        {
          var val = itms.total - itms.first;
        }
        if (is_function(fn))
        {
          fn.call($tt0, val);
        }
        return val;
      });


      //	currentPage event
      $cfs.bind(cf_e('currentPage', conf), function(e, fn) {
        e.stopPropagation();
        var ipp = opts.pagination.items || opts.items.visible,
          max = Math.ceil(itms.total/ipp-1),
          nr;
        if (itms.first == 0)
        {
          nr = 0;
        }
        else if (itms.first < itms.total % ipp)
        {
          nr = 0;
        }
        else if (itms.first == ipp && !opts.circular)
        {
          nr = max;
        }
        else
        {
          nr = Math.round((itms.total-itms.first)/ipp);
        }
        if (nr < 0)
        {
          nr = 0;
        }
        if (nr > max)
        {
          nr = max;
        }
        if (is_function(fn))
        {
          fn.call($tt0, nr);
        }
        return nr;
      });


      //	currentVisible event
      $cfs.bind(cf_e('currentVisible', conf), function(e, fn) {
        e.stopPropagation();
        var $i = gi_getCurrentItems($cfs.children(), opts);
        if (is_function(fn))
        {
          fn.call($tt0, $i);
        }
        return $i;
      });


      //	slice event
      $cfs.bind(cf_e('slice', conf), function(e, f, l, fn) {
        e.stopPropagation();

        if (itms.total == 0)
        {
          return false;
        }

        var v = [f, l, fn],
          t = ['number', 'number', 'function'],
          a = cf_sortParams(v, t);

        f = (is_number(a[0])) ? a[0] : 0;
        l = (is_number(a[1])) ? a[1] : itms.total;
        fn = a[2];

        f += itms.first;
        l += itms.first;

        if (items.total > 0)
        {
          while (f > itms.total)
          {
            f -= itms.total;
          }
          while (l > itms.total)
          {
            l -= itms.total;
          }
          while (f < 0)
          {
            f += itms.total;
          }
          while (l < 0)
          {
            l += itms.total;
          }
        }
        var $iA = $cfs.children(),
          $i;

        if (l > f)
        {
          $i = $iA.slice(f, l);
        }
        else
        {
          $i = $( $iA.slice(f, itms.total).get().concat( $iA.slice(0, l).get() ) );
        }

        if (is_function(fn))
        {
          fn.call($tt0, $i);
        }
        return $i;
      });


      //	isPaused, isStopped and isScrolling events
      $cfs.bind(cf_e('isPaused', conf)+' '+cf_e('isStopped', conf)+' '+cf_e('isScrolling', conf), function(e, fn) {
        e.stopPropagation();
        var eType = e.type.slice(conf.events.prefix.length),
          value = crsl[eType];
        if (is_function(fn))
        {
          fn.call($tt0, value);
        }
        return value;
      });


      //	configuration event
      $cfs.bind(cf_e('configuration', conf), function(e, a, b, c) {
        e.stopPropagation();
        var reInit = false;

        //	return entire configuration-object
        if (is_function(a))
        {
          a.call($tt0, opts);
        }
        //	set multiple options via object
        else if (is_object(a))
        {
          opts_orig = $.extend(true, {}, opts_orig, a);
          if (b !== false) reInit = true;
          else opts = $.extend(true, {}, opts, a);

        }
        else if (!is_undefined(a))
        {

          //	callback function for specific option
          if (is_function(b))
          {
            var val = eval('opts.'+a);
            if (is_undefined(val))
            {
              val = '';
            }
            b.call($tt0, val);
          }
          //	set individual option
          else if (!is_undefined(b))
          {
            if (typeof c !== 'boolean') c = true;
            eval('opts_orig.'+a+' = b');
            if (c !== false) reInit = true;
            else eval('opts.'+a+' = b');
          }
          //	return value for specific option
          else
          {
            return eval('opts.'+a);
          }
        }
        if (reInit)
        {
          sz_resetMargin($cfs.children(), opts);
          FN._init(opts_orig);
          FN._bind_buttons();
          var sz = sz_setSizes($cfs, opts);
          $cfs.trigger(cf_e('updatePageStatus', conf), [true, sz]);
        }
        return opts;
      });


      //	linkAnchors event
      $cfs.bind(cf_e('linkAnchors', conf), function(e, $con, sel) {
        e.stopPropagation();

        if (is_undefined($con))
        {
          $con = $('body');
        }
        else if (is_string($con))
        {
          $con = $($con);
        }
        if (!is_jquery($con) || $con.length == 0)
        {
          return debug(conf, 'Not a valid object.');
        }
        if (!is_string(sel))
        {
          sel = 'a.caroufredsel';
        }

        $con.find(sel).each(function() {
          var h = this.hash || '';
          if (h.length > 0 && $cfs.children().index($(h)) != -1)
          {
            $(this).unbind('click').click(function(e) {
              e.preventDefault();
              $cfs.trigger(cf_e('slideTo', conf), h);
            });
          }
        });
        return true;
      });


      //	updatePageStatus event
      $cfs.bind(cf_e('updatePageStatus', conf), function(e, build, sizes) {
        e.stopPropagation();
        if (!opts.pagination.container)
        {
          return;
        }

        var ipp = opts.pagination.items || opts.items.visible,
          pgs = Math.ceil(itms.total/ipp);

        if (build)
        {
          if (opts.pagination.anchorBuilder)
          {
            opts.pagination.container.children().remove();
            opts.pagination.container.each(function() {
              for (var a = 0; a < pgs; a++)
              {
                var i = $cfs.children().eq( gn_getItemIndex(a*ipp, 0, true, itms, $cfs) );
                $(this).append(opts.pagination.anchorBuilder.call(i[0], a+1));
              }
            });
          }
          opts.pagination.container.each(function() {
            $(this).children().unbind(opts.pagination.event).each(function(a) {
              $(this).bind(opts.pagination.event, function(e) {
                e.preventDefault();
                $cfs.trigger(cf_e('slideTo', conf), [a*ipp, -opts.pagination.deviation, true, opts.pagination]);
              });
            });
          });
        }

        var selected = $cfs.triggerHandler(cf_e('currentPage', conf)) + opts.pagination.deviation;
        if (selected >= pgs)
        {
          selected = 0;
        }
        if (selected < 0)
        {
          selected = pgs-1;
        }
        opts.pagination.container.each(function() {
          $(this).children().removeClass(cf_c('selected', conf)).removeAttr('title').eq(selected).addClass(cf_c('selected', conf)).attr('title', '현재선택'); // 17.08.08 접근성 수정
        });
        return true;
      });


      //	updateSizes event
      $cfs.bind(cf_e('updateSizes', conf), function(e) {
        var vI = opts.items.visible,
          a_itm = $cfs.children(),
          avail_primary = ms_getParentSize($wrp, opts, 'width');

        itms.total = a_itm.length;

        if (crsl.primarySizePercentage)
        {
          opts.maxDimension = avail_primary;
          opts[opts.d['width']] = ms_getPercentage(avail_primary, crsl.primarySizePercentage);
        }
        else
        {
          opts.maxDimension = ms_getMaxDimension(opts, avail_primary);
        }

        if (opts.responsive)
        {
          opts.items.width = opts.items.sizesConf.width;
          opts.items.height = opts.items.sizesConf.height;
          opts = in_getResponsiveValues(opts, a_itm, avail_primary);
          vI = opts.items.visible;
          sz_setResponsiveSizes(opts, a_itm);
        }
        else if (opts.items.visibleConf.variable)
        {
          vI = gn_getVisibleItemsNext(a_itm, opts, 0);
        }
        else if (opts.items.filter != '*')
        {
          vI = gn_getVisibleItemsNextFilter(a_itm, opts, 0);
        }

        if (!opts.circular && itms.first != 0 && vI > itms.first) {
          if (opts.items.visibleConf.variable)
          {
            var nI = gn_getVisibleItemsPrev(a_itm, opts, itms.first) - itms.first;
          }
          else if (opts.items.filter != '*')
          {
            var nI = gn_getVisibleItemsPrevFilter(a_itm, opts, itms.first) - itms.first;
          }
          else
          {
            var nI = opts.items.visible - itms.first;
          }
          debug(conf, 'Preventing non-circular: sliding '+nI+' items backward.');
          $cfs.trigger(cf_e('prev', conf), nI);
        }

        opts.items.visible = cf_getItemsAdjust(vI, opts, opts.items.visibleConf.adjust, $tt0);
        opts.items.visibleConf.old = opts.items.visible;
        opts = in_getAlignPadding(opts, a_itm);

        var sz = sz_setSizes($cfs, opts);
        $cfs.trigger(cf_e('updatePageStatus', conf), [true, sz]);
        nv_showNavi(opts, itms.total, conf);
        nv_enableNavi(opts, itms.first, conf);

        return sz;
      });


      //	destroy event
      $cfs.bind(cf_e('destroy', conf), function(e, orgOrder) {
        e.stopPropagation();
        tmrs = sc_clearTimers(tmrs);

        $cfs.data('_cfs_isCarousel', false);
        $cfs.trigger(cf_e('finish', conf));
        if (orgOrder)
        {
          $cfs.trigger(cf_e('jumpToStart', conf));
        }
        sz_restoreOrigCss($cfs.children());
        sz_restoreOrigCss($cfs);
        FN._unbind_events();
        FN._unbind_buttons();
        if (conf.wrapper == 'parent')
        {
          sz_restoreOrigCss($wrp);
        }
        else
        {
          $wrp.replaceWith($cfs);
        }

        return true;
      });


      //	debug event
      $cfs.bind(cf_e('debug', conf), function(e) {
        debug(conf, 'Carousel width: ' + opts.width);
        debug(conf, 'Carousel height: ' + opts.height);
        debug(conf, 'Item widths: ' + opts.items.width);
        debug(conf, 'Item heights: ' + opts.items.height);
        debug(conf, 'Number of items visible: ' + opts.items.visible);
        if (opts.auto.play)
        {
          debug(conf, 'Number of items scrolled automatically: ' + opts.auto.items);
        }
        if (opts.prev.button)
        {
          debug(conf, 'Number of items scrolled backward: ' + opts.prev.items);
        }
        if (opts.next.button)
        {
          debug(conf, 'Number of items scrolled forward: ' + opts.next.items);
        }
        return conf.debug;
      });


      //	triggerEvent, making prefixed and namespaced events accessible from outside
      $cfs.bind('_cfs_triggerEvent', function(e, n, o) {
        e.stopPropagation();
        return $cfs.triggerHandler(cf_e(n, conf), o);
      });
    };	//	/bind_events


    FN._unbind_events = function() {
      $cfs.unbind(cf_e('', conf));
      $cfs.unbind(cf_e('', conf, false));
      $cfs.unbind('_cfs_triggerEvent');
    };	//	/unbind_events


    FN._bind_buttons = function() {
      FN._unbind_buttons();
      nv_showNavi(opts, itms.total, conf);
      nv_enableNavi(opts, itms.first, conf);

      if (opts.auto.pauseOnHover)
      {
        var pC = bt_pauseOnHoverConfig(opts.auto.pauseOnHover);
        $wrp.bind(cf_e('mouseenter', conf, false), function() { $cfs.trigger(cf_e('pause', conf), pC);	})
          .bind(cf_e('mouseleave', conf, false), function() { $cfs.trigger(cf_e('resume', conf));		});
      }

      //	play button
      if (opts.auto.button)
      {
        opts.auto.button.bind(cf_e(opts.auto.event, conf, false), function(e) {
          e.preventDefault();
          var ev = false,
            pC = null;

          if (crsl.isPaused)
          {
            ev = 'play';
          }
          else if (opts.auto.pauseOnEvent)
          {
            ev = 'pause';
            pC = bt_pauseOnHoverConfig(opts.auto.pauseOnEvent);
          }
          if (ev)
          {
            $cfs.trigger(cf_e(ev, conf), pC);
          }
        });
      }

      //	prev button
      if (opts.prev.button)
      {
        opts.prev.button.bind(cf_e(opts.prev.event, conf, false), function(e) {
          e.preventDefault();
          $cfs.trigger(cf_e('prev', conf));
        });
        if (opts.prev.pauseOnHover)
        {
          var pC = bt_pauseOnHoverConfig(opts.prev.pauseOnHover);
          opts.prev.button.bind(cf_e('mouseenter', conf, false), function() { $cfs.trigger(cf_e('pause', conf), pC);	})
            .bind(cf_e('mouseleave', conf, false), function() { $cfs.trigger(cf_e('resume', conf));		});
        }
      }

      //	next butotn
      if (opts.next.button)
      {
        opts.next.button.bind(cf_e(opts.next.event, conf, false), function(e) {
          e.preventDefault();
          $cfs.trigger(cf_e('next', conf));
        });
        if (opts.next.pauseOnHover)
        {
          var pC = bt_pauseOnHoverConfig(opts.next.pauseOnHover);
          opts.next.button.bind(cf_e('mouseenter', conf, false), function() { $cfs.trigger(cf_e('pause', conf), pC); 	})
            .bind(cf_e('mouseleave', conf, false), function() { $cfs.trigger(cf_e('resume', conf));		});
        }
      }

      //	pagination
      if (opts.pagination.container)
      {
        if (opts.pagination.pauseOnHover)
        {
          var pC = bt_pauseOnHoverConfig(opts.pagination.pauseOnHover);
          opts.pagination.container.bind(cf_e('mouseenter', conf, false), function() { $cfs.trigger(cf_e('pause', conf), pC);	})
            .bind(cf_e('mouseleave', conf, false), function() { $cfs.trigger(cf_e('resume', conf));	});
        }
      }

      //	prev/next keys
      if (opts.prev.key || opts.next.key)
      {
        $(document).bind(cf_e('keyup', conf, false, true, true), function(e) {
          var k = e.keyCode;
          if (k == opts.next.key)
          {
            e.preventDefault();
            $cfs.trigger(cf_e('next', conf));
          }
          if (k == opts.prev.key)
          {
            e.preventDefault();
            $cfs.trigger(cf_e('prev', conf));
          }
        });
      }

      //	pagination keys
      if (opts.pagination.keys)
      {
        $(document).bind(cf_e('keyup', conf, false, true, true), function(e) {
          var k = e.keyCode;
          if (k >= 49 && k < 58)
          {
            k = (k-49) * opts.items.visible;
            if (k <= itms.total)
            {
              e.preventDefault();
              $cfs.trigger(cf_e('slideTo', conf), [k, 0, true, opts.pagination]);
            }
          }
        });
      }

      //	swipe
      if ($.fn.swipe)
      {
        var isTouch = 'ontouchstart' in window;
        if ((isTouch && opts.swipe.onTouch) || (!isTouch && opts.swipe.onMouse))
        {
          var scP = $.extend(true, {}, opts.prev, opts.swipe),
            scN = $.extend(true, {}, opts.next, opts.swipe),
            swP = function() { $cfs.trigger(cf_e('prev', conf), [scP]) },
            swN = function() { $cfs.trigger(cf_e('next', conf), [scN]) };

          switch (opts.direction)
          {
            case 'up':
            case 'down':
              opts.swipe.options.swipeUp = swN;
              opts.swipe.options.swipeDown = swP;
              break;
            default:
              opts.swipe.options.swipeLeft = swN;
              opts.swipe.options.swipeRight = swP;
          }
          if (crsl.swipe)
          {
            $cfs.swipe('destroy');
          }
          $wrp.swipe(opts.swipe.options);
          $wrp.css('cursor', 'move');
          crsl.swipe = true;
        }
      }

      //	mousewheel
      if ($.fn.mousewheel)
      {

        if (opts.mousewheel)
        {
          var mcP = $.extend(true, {}, opts.prev, opts.mousewheel),
            mcN = $.extend(true, {}, opts.next, opts.mousewheel);

          if (crsl.mousewheel)
          {
            $wrp.unbind(cf_e('mousewheel', conf, false));
          }
          $wrp.bind(cf_e('mousewheel', conf, false), function(e, delta) {
            e.preventDefault();
            if (delta > 0)
            {
              $cfs.trigger(cf_e('prev', conf), [mcP]);
            }
            else
            {
              $cfs.trigger(cf_e('next', conf), [mcN]);
            }
          });
          crsl.mousewheel = true;
        }
      }

      if (opts.auto.play)
      {
        $cfs.trigger(cf_e('play', conf), opts.auto.delay);
      }

      if (crsl.upDateOnWindowResize)
      {
        var resizeFn = function(e) {
          $cfs.trigger(cf_e('finish', conf));
          if (opts.auto.pauseOnResize && !crsl.isPaused)
          {
            $cfs.trigger(cf_e('play', conf));
          }
          sz_resetMargin($cfs.children(), opts);
          $cfs.trigger(cf_e('updateSizes', conf));
        };

        var $w = $(window),
          onResize = null;

        if ($.debounce && conf.onWindowResize == 'debounce')
        {
          onResize = $.debounce(200, resizeFn);
        }
        else if ($.throttle && conf.onWindowResize == 'throttle')
        {
          onResize = $.throttle(300, resizeFn);
        }
        else
        {
          var _windowWidth = 0,
            _windowHeight = 0;

          onResize = function() {
            var nw = $w.width(),
              nh = $w.height();

            if (nw != _windowWidth || nh != _windowHeight)
            {
              resizeFn();
              _windowWidth = nw;
              _windowHeight = nh;
            }
          };
        }
        $w.bind(cf_e('resize', conf, false, true, true), onResize);
      }
    };	//	/bind_buttons


    FN._unbind_buttons = function() {
      var ns1 = cf_e('', conf),
        ns2 = cf_e('', conf, false);
      ns3 = cf_e('', conf, false, true, true);

      $(document).unbind(ns3);
      $(window).unbind(ns3);
      $wrp.unbind(ns2);

      if (opts.auto.button)
      {
        opts.auto.button.unbind(ns2);
      }
      if (opts.prev.button)
      {
        opts.prev.button.unbind(ns2);
      }
      if (opts.next.button)
      {
        opts.next.button.unbind(ns2);
      }
      if (opts.pagination.container)
      {
        opts.pagination.container.unbind(ns2);
        if (opts.pagination.anchorBuilder)
        {
          opts.pagination.container.children().remove();
        }
      }
      if (crsl.swipe)
      {
        $cfs.swipe('destroy');
        $wrp.css('cursor', 'default');
        crsl.swipe = false;
      }
      if (crsl.mousewheel)
      {
        crsl.mousewheel = false;
      }

      nv_showNavi(opts, 'hide', conf);
      nv_enableNavi(opts, 'removeClass', conf);

    };	//	/unbind_buttons



    //	START

    if (is_boolean(configs))
    {
      configs = {
        'debug': configs
      };
    }

    //	set vars
    var crsl = {
        'direction'		: 'next',
        'isPaused'		: true,
        'isScrolling'	: false,
        'isStopped'		: false,
        'mousewheel'	: false,
        'swipe'			: false
      },
      itms = {
        'total'			: $cfs.children().length,
        'first'			: 0
      },
      tmrs = {
        'auto'			: null,
        'progress'		: null,
        'startTime'		: getTime(),
        'timePassed'	: 0
      },
      scrl = {
        'isStopped'		: false,
        'duration'		: 0,
        'startTime'		: 0,
        'easing'		: '',
        'anims'			: []
      },
      clbk = {
        'onBefore'		: [],
        'onAfter'		: []
      },
      queu = [],
      conf = $.extend(true, {}, $.fn.carouFredSel.configs, configs),
      opts = {},
      opts_orig = $.extend(true, {}, options),
      $wrp = (conf.wrapper == 'parent')
        ? $cfs.parent()
        : $cfs.wrap('<'+conf.wrapper.element+' class="'+conf.wrapper.classname+'" />').parent();


    conf.selector		= $cfs.selector;
    conf.serialNumber	= $.fn.carouFredSel.serialNumber++;

    conf.transition = (conf.transition && $.fn.transition) ? 'transition' : 'animate';

    //	create carousel
    FN._init(opts_orig, true, starting_position);
    FN._build();
    FN._bind_events();
    FN._bind_buttons();

    //	find item to start
    if (is_array(opts.items.start))
    {
      var start_arr = opts.items.start;
    }
    else
    {
      var start_arr = [];
      if (opts.items.start != 0)
      {
        start_arr.push(opts.items.start);
      }
    }
    if (opts.cookie)
    {
      start_arr.unshift(parseInt(cf_getCookie(opts.cookie), 10));
    }

    if (start_arr.length > 0)
    {
      for (var a = 0, l = start_arr.length; a < l; a++)
      {
        var s = start_arr[a];
        if (s == 0)
        {
          continue;
        }
        if (s === true)
        {
          s = window.location.hash;
          if (s.length < 1)
          {
            continue;
          }
        }
        else if (s === 'random')
        {
          s = Math.floor(Math.random()*itms.total);
        }
        if ($cfs.triggerHandler(cf_e('slideTo', conf), [s, 0, true, { fx: 'none' }]))
        {
          break;
        }
      }
    }
    var siz = sz_setSizes($cfs, opts),
      itm = gi_getCurrentItems($cfs.children(), opts);

    if (opts.onCreate)
    {
      opts.onCreate.call($tt0, {
        'width': siz.width,
        'height': siz.height,
        'items': itm
      });
    }

    $cfs.trigger(cf_e('updatePageStatus', conf), [true, siz]);
    $cfs.trigger(cf_e('linkAnchors', conf));

    if (conf.debug)
    {
      $cfs.trigger(cf_e('debug', conf));
    }

    return $cfs;
  };



  //	GLOBAL PUBLIC

  $.fn.carouFredSel.serialNumber = 1;
  $.fn.carouFredSel.defaults = {
    'synchronise'	: false,
    'infinite'		: true,
    'circular'		: true,
    'responsive'	: false,
    'direction'		: 'left',
    'items'			: {
      'start'			: 0
    },
    'scroll'		: {
      'easing'		: 'swing',
      'duration'		: 500,

      'pauseOnHover'	: false,
      'event'			: 'click',
      'queue'			: false
    }
  };
  $.fn.carouFredSel.configs = {
    'debug'			: false,
    'transition'	: false,
    'onWindowResize': 'throttle',
    'events'		: {
      'prefix'		: '',
      'namespace'		: 'cfs'
    },
    'wrapper'		: {
      'element'		: 'div',
      'classname'		: 'caroufredsel_wrapper'
    },
    'classnames'	: {}
  };
  $.fn.carouFredSel.pageAnchorBuilder = function(nr) {
    return '<a href="#"><span>'+nr+'</span></a>';
  };
  $.fn.carouFredSel.progressbarUpdater = function(perc) {
    $(this).css('width', perc+'%');
  };

  $.fn.carouFredSel.cookie = {
    get: function(n) {
      n += '=';
      var ca = document.cookie.split(';');
      for (var a = 0, l = ca.length; a < l; a++)
      {
        var c = ca[a];
        while (c.charAt(0) == ' ')
        {
          c = c.slice(1);
        }
        if (c.indexOf(n) == 0)
        {
          return c.slice(n.length);
        }
      }
      return 0;
    },
    set: function(n, v, d) {
      var e = "";
      if (d)
      {
        var date = new Date();
        date.setTime(date.getTime() + (d * 24 * 60 * 60 * 1000));
        e = "; expires=" + date.toGMTString();
      }
      document.cookie = n + '=' + v + e + '; path=/';
    },
    remove: function(n) {
      $.fn.carouFredSel.cookie.set(n, "", -1);
    }
  };


  //	GLOBAL PRIVATE

  //	scrolling functions
  function sc_setScroll(d, e, c) {
    if (c.transition == 'transition')
    {
      if (e == 'swing')
      {
        e = 'ease';
      }
    }
    return {
      anims: [],
      duration: d,
      orgDuration: d,
      easing: e,
      startTime: getTime()
    };
  }
  function sc_startScroll(s, c) {
    for (var a = 0, l = s.anims.length; a < l; a++)
    {
      var b = s.anims[a];
      if (!b)
      {
        continue;
      }
      b[0][c.transition](b[1], s.duration, s.easing, b[2]);
    }
  }
  function sc_stopScroll(s, finish) {
    if (!is_boolean(finish))
    {
      finish = true;
    }
    if (is_object(s.pre))
    {
      sc_stopScroll(s.pre, finish);
    }
    for (var a = 0, l = s.anims.length; a < l; a++)
    {
      var b = s.anims[a];
      b[0].stop(true);
      if (finish)
      {
        b[0].css(b[1]);
        if (is_function(b[2]))
        {
          b[2]();
        }
      }
    }
    if (is_object(s.post))
    {
      sc_stopScroll(s.post, finish);
    }
  }
  function sc_afterScroll( $c, $c2, o ) {
    if ($c2)
    {
      $c2.remove();
    }

    switch(o.fx) {
      case 'fade':
      case 'crossfade':
      case 'cover-fade':
      case 'uncover-fade':
        $c.css('opacity', 1);
        $c.css('filter', '');
        break;
    }
  }
  function sc_fireCallbacks($t, o, b, a, c) {
    if (o[b])
    {
      o[b].call($t, a);
    }
    if (c[b].length)
    {
      for (var i = 0, l = c[b].length; i < l; i++)
      {
        c[b][i].call($t, a);
      }
    }
    return [];
  }
  function sc_fireQueue($c, q, c) {

    if (q.length)
    {
      $c.trigger(cf_e(q[0][0], c), q[0][1]);
      q.shift();
    }
    return q;
  }
  function sc_hideHiddenItems(hiddenitems) {
    hiddenitems.each(function() {
      var hi = $(this);
      hi.data('_cfs_isHidden', hi.is(':hidden')).hide();
    });
  }
  function sc_showHiddenItems(hiddenitems) {
    if (hiddenitems)
    {
      hiddenitems.each(function() {
        var hi = $(this);
        if (!hi.data('_cfs_isHidden'))
        {
          hi.show();
        }
      });
    }
  }
  function sc_clearTimers(t) {
    if (t.auto)
    {
      clearTimeout(t.auto);
    }
    if (t.progress)
    {
      clearInterval(t.progress);
    }
    return t;
  }
  function sc_mapCallbackArguments(i_old, i_skp, i_new, s_itm, s_dir, s_dur, w_siz) {
    return {
      'width': w_siz.width,
      'height': w_siz.height,
      'items': {
        'old': i_old,
        'skipped': i_skp,
        'visible': i_new
      },
      'scroll': {
        'items': s_itm,
        'direction': s_dir,
        'duration': s_dur
      }
    };
  }
  function sc_getDuration( sO, o, nI, siz ) {
    var dur = sO.duration;
    if (sO.fx == 'none')
    {
      return 0;
    }
    if (dur == 'auto')
    {
      dur = o.scroll.duration / o.scroll.items * nI;
    }
    else if (dur < 10)
    {
      dur = siz / dur;
    }
    if (dur < 1)
    {
      return 0;
    }
    if (sO.fx == 'fade')
    {
      dur = dur / 2;

    }
    return Math.round(dur);
  }

  //	navigation functions
  function nv_showNavi(o, t, c) {
    var minimum = (is_number(o.items.minimum)) ? o.items.minimum : o.items.visible + 1;
    if (t == 'show' || t == 'hide')
    {
      var f = t;
    }
    else if (minimum > t)
    {
      debug(c, 'Not enough items ('+t+' total, '+minimum+' needed): Hiding navigation.');
      var f = 'hide';
    }
    else
    {
      var f = 'show';
    }
    var s = (f == 'show') ? 'removeClass' : 'addClass',
      h = cf_c('hidden', c);

    if (o.auto.button)
    {
      o.auto.button[f]()[s](h);
    }
    if (o.prev.button)
    {
      o.prev.button[f]()[s](h);
    }
    if (o.next.button)
    {
      o.next.button[f]()[s](h);
    }
    if (o.pagination.container)
    {
      o.pagination.container[f]()[s](h);
    }
  }
  function nv_enableNavi(o, f, c) {
    if (o.circular || o.infinite) return;
    var fx = (f == 'removeClass' || f == 'addClass') ? f : false,
      di = cf_c('disabled', c);

    if (o.auto.button && fx)
    {
      o.auto.button[fx](di);
    }
    if (o.prev.button)
    {
      var fn = fx || (f == 0) ? 'addClass' : 'removeClass';
      o.prev.button[fn](di);
    }
    if (o.next.button)
    {
      var fn = fx || (f == o.items.visible) ? 'addClass' : 'removeClass';
      o.next.button[fn](di);
    }
  }

  //	get object functions
  function go_getObject($tt, obj) {
    if (is_function(obj))
    {
      obj = obj.call($tt);
    }
    else if (is_undefined(obj))
    {
      obj = {};
    }
    return obj;
  }
  function go_getItemsObject($tt, obj) {
    obj = go_getObject($tt, obj);
    if (is_number(obj))
    {
      obj	= {
        'visible': obj
      };
    }
    else if (obj == 'variable')
    {
      obj = {
        'visible': obj,
        'width': obj,
        'height': obj
      };
    }
    else if (!is_object(obj))
    {
      obj = {};
    }
    return obj;
  }
  function go_getScrollObject($tt, obj) {
    obj = go_getObject($tt, obj);
    if (is_number(obj))
    {
      if (obj <= 50)
      {
        obj = {
          'items': obj
        };
      }
      else
      {
        obj = {
          'duration': obj
        };
      }
    }
    else if (is_string(obj))
    {
      obj = {
        'easing': obj
      };
    }
    else if (!is_object(obj))
    {
      obj = {};
    }
    return obj;
  }
  function go_getNaviObject($tt, obj) {
    obj = go_getObject($tt, obj);
    if (is_string(obj))
    {
      var temp = cf_getKeyCode(obj);
      if (temp == -1)
      {
        obj = $(obj);
      }
      else
      {
        obj = temp;
      }
    }
    return obj;
  }

  function go_getAutoObject($tt, obj) {
    obj = go_getNaviObject($tt, obj);
    if (is_jquery(obj))
    {
      obj = {
        'button': obj
      };
    }
    else if (is_boolean(obj))
    {
      obj = {
        'play': obj
      };
    }
    else if (is_number(obj))
    {
      obj = {
        'timeoutDuration': obj
      };
    }
    if (obj.progress)
    {
      if (is_string(obj.progress) || is_jquery(obj.progress))
      {
        obj.progress = {
          'bar': obj.progress
        };
      }
    }
    return obj;
  }
  function go_complementAutoObject($tt, obj) {
    if (is_function(obj.button))
    {
      obj.button = obj.button.call($tt);
    }
    if (is_string(obj.button))
    {
      obj.button = $(obj.button);
    }
    if (!is_boolean(obj.play))
    {
      obj.play = true;
    }
    if (!is_number(obj.delay))
    {
      obj.delay = 0;
    }
    if (is_undefined(obj.pauseOnEvent))
    {
      obj.pauseOnEvent = true;
    }
    if (!is_boolean(obj.pauseOnResize))
    {
      obj.pauseOnResize = true;
    }
    if (!is_number(obj.timeoutDuration))
    {
      obj.timeoutDuration = (obj.duration < 10)
        ? 2500
        : obj.duration * 5;
    }
    if (obj.progress)
    {
      if (is_function(obj.progress.bar))
      {
        obj.progress.bar = obj.progress.bar.call($tt);
      }
      if (is_string(obj.progress.bar))
      {
        obj.progress.bar = $(obj.progress.bar);
      }
      if (obj.progress.bar)
      {
        if (!is_function(obj.progress.updater))
        {
          obj.progress.updater = $.fn.carouFredSel.progressbarUpdater;
        }
        if (!is_number(obj.progress.interval))
        {
          obj.progress.interval = 50;
        }
      }
      else
      {
        obj.progress = false;
      }
    }
    return obj;
  }


  function go_getPrevNextObject($tt, obj) {
    obj = go_getNaviObject($tt, obj);
    if (is_jquery(obj))
    {
      obj = {
        'button': obj
      };
    }
    else if (is_number(obj))
    {
      obj = {
        'key': obj
      };
    }
    return obj;
  }
  function go_complementPrevNextObject($tt, obj) {
    if (is_function(obj.button))
    {
      obj.button = obj.button.call($tt);
    }
    if (is_string(obj.button))
    {
      obj.button = $(obj.button);
    }
    if (is_string(obj.key))
    {
      obj.key = cf_getKeyCode(obj.key);
    }
    return obj;
  }

  function go_getPaginationObject($tt, obj) {
    obj = go_getNaviObject($tt, obj);
    if (is_jquery(obj))
    {
      obj = {
        'container': obj
      };
    }
    else if (is_boolean(obj))
    {
      obj = {
        'keys': obj
      };
    }
    return obj;
  }
  function go_complementPaginationObject($tt, obj) {
    if (is_function(obj.container))
    {
      obj.container = obj.container.call($tt);
    }
    if (is_string(obj.container))
    {
      obj.container = $(obj.container);
    }
    if (!is_number(obj.items))
    {
      obj.items = false;
    }
    if (!is_boolean(obj.keys))
    {
      obj.keys = false;
    }
    if (!is_function(obj.anchorBuilder) && !is_false(obj.anchorBuilder))
    {
      obj.anchorBuilder = $.fn.carouFredSel.pageAnchorBuilder;
    }
    if (!is_number(obj.deviation))
    {
      obj.deviation = 0;
    }
    return obj;
  }

  function go_getSwipeObject($tt, obj) {
    if (is_function(obj))
    {
      obj = obj.call($tt);
    }
    if (is_undefined(obj))
    {
      obj = {
        'onTouch': false
      };
    }
    if (is_true(obj))
    {
      obj = {
        'onTouch': obj
      };
    }
    else if (is_number(obj))
    {
      obj = {
        'items': obj
      };
    }
    return obj;
  }
  function go_complementSwipeObject($tt, obj) {
    if (!is_boolean(obj.onTouch))
    {
      obj.onTouch = true;
    }
    if (!is_boolean(obj.onMouse))
    {
      obj.onMouse = false;
    }
    if (!is_object(obj.options))
    {
      obj.options = {};
    }
    if (!is_boolean(obj.options.triggerOnTouchEnd))
    {
      obj.options.triggerOnTouchEnd = false;
    }
    return obj;
  }
  function go_getMousewheelObject($tt, obj) {
    if (is_function(obj))
    {
      obj = obj.call($tt);
    }
    if (is_true(obj))
    {
      obj = {};
    }
    else if (is_number(obj))
    {
      obj = {
        'items': obj
      };
    }
    else if (is_undefined(obj))
    {
      obj = false;
    }
    return obj;
  }
  function go_complementMousewheelObject($tt, obj) {
    return obj;
  }

  //	get number functions
  function gn_getItemIndex(num, dev, org, items, $cfs) {
    if (is_string(num))
    {
      num = $(num, $cfs);
    }

    if (is_object(num))
    {
      num = $(num, $cfs);
    }
    if (is_jquery(num))
    {
      num = $cfs.children().index(num);
      if (!is_boolean(org))
      {
        org = false;
      }
    }
    else
    {
      if (!is_boolean(org))
      {
        org = true;
      }
    }
    if (!is_number(num))
    {
      num = 0;
    }
    if (!is_number(dev))
    {
      dev = 0;
    }

    if (org)
    {
      num += items.first;
    }
    num += dev;
    if (items.total > 0)
    {
      while (num >= items.total)
      {
        num -= items.total;
      }
      while (num < 0)
      {
        num += items.total;
      }
    }
    return num;
  }

  //	items prev
  function gn_getVisibleItemsPrev(i, o, s) {
    var t = 0,
      x = 0;

    for (var a = s; a >= 0; a--)
    {
      var j = i.eq(a);
      t += (j.is(':visible')) ? j[o.d['outerWidth']](true) : 0;
      if (t > o.maxDimension)
      {
        return x;
      }
      if (a == 0)
      {
        a = i.length;
      }
      x++;
    }
  }
  function gn_getVisibleItemsPrevFilter(i, o, s) {
    return gn_getItemsPrevFilter(i, o.items.filter, o.items.visibleConf.org, s);
  }
  function gn_getScrollItemsPrevFilter(i, o, s, m) {
    return gn_getItemsPrevFilter(i, o.items.filter, m, s);
  }
  function gn_getItemsPrevFilter(i, f, m, s) {
    var t = 0,
      x = 0;

    for (var a = s, l = i.length; a >= 0; a--)
    {
      x++;
      if (x == l)
      {
        return x;
      }

      var j = i.eq(a);
      if (j.is(f))
      {
        t++;
        if (t == m)
        {
          return x;
        }
      }
      if (a == 0)
      {
        a = l;
      }
    }
  }

  function gn_getVisibleOrg($c, o) {
    return o.items.visibleConf.org || $c.children().slice(0, o.items.visible).filter(o.items.filter).length;
  }

  //	items next
  function gn_getVisibleItemsNext(i, o, s) {
    var t = 0,
      x = 0;

    for (var a = s, l = i.length-1; a <= l; a++)
    {
      var j = i.eq(a);

      t += (j.is(':visible')) ? j[o.d['outerWidth']](true) : 0;
      if (t > o.maxDimension)
      {
        return x;
      }

      x++;
      if (x == l+1)
      {
        return x;
      }
      if (a == l)
      {
        a = -1;
      }
    }
  }
  function gn_getVisibleItemsNextTestCircular(i, o, s, l) {
    var v = gn_getVisibleItemsNext(i, o, s);
    if (!o.circular)
    {
      if (s + v > l)
      {
        v = l - s;
      }
    }
    return v;
  }
  function gn_getVisibleItemsNextFilter(i, o, s) {
    return gn_getItemsNextFilter(i, o.items.filter, o.items.visibleConf.org, s, o.circular);
  }
  function gn_getScrollItemsNextFilter(i, o, s, m) {
    return gn_getItemsNextFilter(i, o.items.filter, m+1, s, o.circular) - 1;
  }
  function gn_getItemsNextFilter(i, f, m, s, c) {
    var t = 0,
      x = 0;

    for (var a = s, l = i.length-1; a <= l; a++)
    {
      x++;
      if (x >= l)
      {
        return x;
      }

      var j = i.eq(a);
      if (j.is(f))
      {
        t++;
        if (t == m)
        {
          return x;
        }
      }
      if (a == l)
      {
        a = -1;
      }
    }
  }

  //	get items functions
  function gi_getCurrentItems(i, o) {
    return i.slice(0, o.items.visible);
  }
  function gi_getOldItemsPrev(i, o, n) {
    return i.slice(n, o.items.visibleConf.old+n);
  }
  function gi_getNewItemsPrev(i, o) {
    return i.slice(0, o.items.visible);
  }
  function gi_getOldItemsNext(i, o) {
    return i.slice(0, o.items.visibleConf.old);
  }
  function gi_getNewItemsNext(i, o, n) {
    return i.slice(n, o.items.visible+n);
  }

  //	sizes functions
  function sz_storeMargin(i, o, d) {
    if (o.usePadding)
    {
      if (!is_string(d))
      {
        d = '_cfs_origCssMargin';
      }
      i.each(function() {
        var j = $(this),
          m = parseInt(j.css(o.d['marginRight']), 10);
        if (!is_number(m))
        {
          m = 0;
        }
        j.data(d, m);
      });
    }
  }
  function sz_resetMargin(i, o, m) {
    if (o.usePadding)
    {
      var x = (is_boolean(m)) ? m : false;
      if (!is_number(m))
      {
        m = 0;
      }
      sz_storeMargin(i, o, '_cfs_tempCssMargin');
      i.each(function() {
        var j = $(this);
        j.css(o.d['marginRight'], ((x) ? j.data('_cfs_tempCssMargin') : m + j.data('_cfs_origCssMargin')));
      });
    }
  }
  function sz_storeOrigCss(i) {
    i.each(function() {
      var j = $(this);
      j.data('_cfs_origCss', j.attr('style') || '');
    });
  }
  function sz_restoreOrigCss(i) {
    i.each(function() {
      var j = $(this);
      j.attr('style', j.data('_cfs_origCss') || '');
    });
  }
  function sz_setResponsiveSizes(o, all) {
    var visb = o.items.visible,
      newS = o.items[o.d['width']],
      seco = o[o.d['height']],
      secp = is_percentage(seco);

    all.each(function() {
      var $t = $(this),
        nw = newS - ms_getPaddingBorderMargin($t, o, 'Width');

      $t[o.d['width']](nw);
      if (secp)
      {
        $t[o.d['height']](ms_getPercentage(nw, seco));
      }
    });
  }
  function sz_setSizes($c, o) {
    var $w = $c.parent(),
      $i = $c.children(),
      $v = gi_getCurrentItems($i, o),
      sz = cf_mapWrapperSizes(ms_getSizes($v, o, true), o, false);

    $w.css(sz);

    if (o.usePadding)
    {
      var p = o.padding,
        r = p[o.d[1]];

      if (o.align && r < 0)
      {
        r = 0;
      }
      var $l = $v.last();
      $l.css(o.d['marginRight'], $l.data('_cfs_origCssMargin') + r);
      $c.css(o.d['top'], p[o.d[0]]);
      $c.css(o.d['left'], p[o.d[3]]);
    }

    $c.css(o.d['width'], sz[o.d['width']]+(ms_getTotalSize($i, o, 'width')*2));
    $c.css(o.d['height'], ms_getLargestSize($i, o, 'height'));
    return sz;
  }

  //	measuring functions
  function ms_getSizes(i, o, wrapper) {
    return [ms_getTotalSize(i, o, 'width', wrapper), ms_getLargestSize(i, o, 'height', wrapper)];
  }
  function ms_getLargestSize(i, o, dim, wrapper) {
    if (!is_boolean(wrapper))
    {
      wrapper = false;
    }
    if (is_number(o[o.d[dim]]) && wrapper)
    {
      return o[o.d[dim]];
    }
    if (is_number(o.items[o.d[dim]]))
    {
      return o.items[o.d[dim]];
    }
    dim = (dim.toLowerCase().indexOf('width') > -1) ? 'outerWidth' : 'outerHeight';
    return ms_getTrueLargestSize(i, o, dim);
  }
  function ms_getTrueLargestSize(i, o, dim) {
    var s = 0;

    for (var a = 0, l = i.length; a < l; a++)
    {
      var j = i.eq(a);

      var m = (j.is(':visible')) ? j[o.d[dim]](true) : 0;
      if (s < m)
      {
        s = m;
      }
    }
    return s;
  }

  function ms_getTotalSize(i, o, dim, wrapper) {
    if (!is_boolean(wrapper))
    {
      wrapper = false;
    }
    if (is_number(o[o.d[dim]]) && wrapper)
    {
      return o[o.d[dim]];
    }
    if (is_number(o.items[o.d[dim]]))
    {
      return o.items[o.d[dim]] * i.length;
    }

    var d = (dim.toLowerCase().indexOf('width') > -1) ? 'outerWidth' : 'outerHeight',
      s = 0;

    for (var a = 0, l = i.length; a < l; a++)
    {
      var j = i.eq(a);
      s += (j.is(':visible')) ? j[o.d[d]](true) : 0;
    }
    return s;
  }
  function ms_getParentSize($w, o, d) {
    var isVisible = $w.is(':visible');
    if (isVisible)
    {
      $w.hide();
    }
    var s = $w.parent()[o.d[d]]();
    if (isVisible)
    {
      $w.show();
    }
    return s;
  }
  function ms_getMaxDimension(o, a) {
    return (is_number(o[o.d['width']])) ? o[o.d['width']] : a;
  }
  function ms_hasVariableSizes(i, o, dim) {
    var s = false,
      v = false;

    for (var a = 0, l = i.length; a < l; a++)
    {
      var j = i.eq(a);

      var c = (j.is(':visible')) ? j[o.d[dim]](true) : 0;
      if (s === false)
      {
        s = c;
      }
      else if (s != c)
      {
        v = true;
      }
      if (s == 0)
      {
        v = true;
      }
    }
    return v;
  }
  function ms_getPaddingBorderMargin(i, o, d) {
    return i[o.d['outer'+d]](true) - i[o.d[d.toLowerCase()]]();
  }
  function ms_getPercentage(s, o) {
    if (is_percentage(o))
    {
      o = parseInt( o.slice(0, -1), 10 );
      if (!is_number(o))
      {
        return s;
      }
      s *= o/100;
    }
    return s;
  }

  //	config functions
  function cf_e(n, c, pf, ns, rd) {
    if (!is_boolean(pf))
    {
      pf = true;
    }
    if (!is_boolean(ns))
    {
      ns = true;
    }
    if (!is_boolean(rd))
    {
      rd = false;
    }

    if (pf)
    {
      n = c.events.prefix + n;
    }
    if (ns)
    {
      n = n +'.'+ c.events.namespace;
    }
    if (ns && rd)
    {
      n += c.serialNumber;
    }

    return n;
  }
  function cf_c(n, c) {
    return (is_string(c.classnames[n])) ? c.classnames[n] : n;
  }
  function cf_mapWrapperSizes(ws, o, p) {
    if (!is_boolean(p))
    {
      p = true;
    }
    var pad = (o.usePadding && p) ? o.padding : [0, 0, 0, 0];
    var wra = {};

    wra[o.d['width']] = ws[0] + pad[1] + pad[3];
    wra[o.d['height']] = ws[1] + pad[0] + pad[2];

    return wra;
  }
  function cf_sortParams(vals, typs) {
    var arr = [];
    for (var a = 0, l1 = vals.length; a < l1; a++)
    {
      for (var b = 0, l2 = typs.length; b < l2; b++)
      {
        if (typs[b].indexOf(typeof vals[a]) > -1 && is_undefined(arr[b]))
        {
          arr[b] = vals[a];
          break;
        }
      }
    }
    return arr;
  }
  function cf_getPadding(p) {
    if (is_undefined(p))
    {
      return [0, 0, 0, 0];
    }
    if (is_number(p))
    {
      return [p, p, p, p];
    }
    if (is_string(p))
    {
      p = p.split('px').join('').split('em').join('').split(' ');
    }

    if (!is_array(p))
    {
      return [0, 0, 0, 0];
    }
    for (var i = 0; i < 4; i++)
    {
      p[i] = parseInt(p[i], 10);
    }
    switch (p.length)
    {
      case 0:
        return [0, 0, 0, 0];
      case 1:
        return [p[0], p[0], p[0], p[0]];
      case 2:
        return [p[0], p[1], p[0], p[1]];
      case 3:
        return [p[0], p[1], p[2], p[1]];
      default:
        return [p[0], p[1], p[2], p[3]];
    }
  }
  function cf_getAlignPadding(itm, o) {
    var x = (is_number(o[o.d['width']])) ? Math.ceil(o[o.d['width']] - ms_getTotalSize(itm, o, 'width')) : 0;
    switch (o.align)
    {
      case 'left':
        return [0, x];
      case 'right':
        return [x, 0];
      case 'center':
      default:
        return [Math.ceil(x/2), Math.floor(x/2)];
    }
  }
  function cf_getDimensions(o) {
    var dm = [
      ['width'	, 'innerWidth'	, 'outerWidth'	, 'height'	, 'innerHeight'	, 'outerHeight'	, 'left', 'top'	, 'marginRight'	, 0, 1, 2, 3],
      ['height'	, 'innerHeight'	, 'outerHeight'	, 'width'	, 'innerWidth'	, 'outerWidth'	, 'top'	, 'left', 'marginBottom', 3, 2, 1, 0]
    ];

    var dl = dm[0].length,
      dx = (o.direction == 'right' || o.direction == 'left') ? 0 : 1;

    var dimensions = {};
    for (var d = 0; d < dl; d++)
    {
      dimensions[dm[0][d]] = dm[dx][d];
    }
    return dimensions;
  }
  function cf_getAdjust(x, o, a, $t) {
    var v = x;
    if (is_function(a))
    {
      v = a.call($t, v);

    }
    else if (is_string(a))
    {
      var p = a.split('+'),
        m = a.split('-');

      if (m.length > p.length)
      {
        var neg = true,
          sta = m[0],
          adj = m[1];
      }
      else
      {
        var neg = false,
          sta = p[0],
          adj = p[1];
      }

      switch(sta)
      {
        case 'even':
          v = (x % 2 == 1) ? x-1 : x;
          break;
        case 'odd':
          v = (x % 2 == 0) ? x-1 : x;
          break;
        default:
          v = x;
          break;
      }
      adj = parseInt(adj, 10);
      if (is_number(adj))
      {
        if (neg)
        {
          adj = -adj;
        }
        v += adj;
      }
    }
    if (!is_number(v) || v < 1)
    {
      v = 1;
    }
    return v;
  }
  function cf_getItemsAdjust(x, o, a, $t) {
    return cf_getItemAdjustMinMax(cf_getAdjust(x, o, a, $t), o.items.visibleConf);
  }
  function cf_getItemAdjustMinMax(v, i) {
    if (is_number(i.min) && v < i.min)
    {
      v = i.min;
    }
    if (is_number(i.max) && v > i.max)
    {
      v = i.max;
    }
    if (v < 1)
    {
      v = 1;
    }
    return v;
  }
  function cf_getSynchArr(s) {
    if (!is_array(s))
    {
      s = [[s]];
    }
    if (!is_array(s[0]))
    {
      s = [s];
    }
    for (var j = 0, l = s.length; j < l; j++)
    {
      if (is_string(s[j][0]))
      {
        s[j][0] = $(s[j][0]);
      }
      if (!is_boolean(s[j][1]))
      {
        s[j][1] = true;
      }
      if (!is_boolean(s[j][2]))
      {
        s[j][2] = true;
      }
      if (!is_number(s[j][3]))
      {
        s[j][3] = 0;
      }
    }
    return s;
  }
  function cf_getKeyCode(k) {
    if (k == 'right')
    {
      return 39;
    }
    if (k == 'left')
    {
      return 37;
    }
    if (k == 'up')
    {
      return 38;
    }
    if (k == 'down')
    {
      return 40;
    }
    return -1;
  }
  function cf_setCookie(n, $c, c) {
    if (n)
    {
      var v = $c.triggerHandler(cf_e('currentPosition', c));
      $.fn.carouFredSel.cookie.set(n, v);
    }
  }
  function cf_getCookie(n) {
    var c = $.fn.carouFredSel.cookie.get(n);
    return (c == '') ? 0 : c;
  }

  //	init function
  function in_mapCss($elem, props) {
    var css = {};
    for (var p = 0, l = props.length; p < l; p++)
    {
      css[props[p]] = $elem.css(props[p]);
    }
    return css;
  }
  function in_complementItems(obj, opt, itm, sta) {
    if (!is_object(obj.visibleConf))
    {
      obj.visibleConf = {};
    }
    if (!is_object(obj.sizesConf))
    {
      obj.sizesConf = {};
    }

    if (obj.start == 0 && is_number(sta))
    {
      obj.start = sta;
    }

    //	visible items
    if (is_object(obj.visible))
    {
      obj.visibleConf.min = obj.visible.min;
      obj.visibleConf.max = obj.visible.max;
      obj.visible = false;
    }
    else if (is_string(obj.visible))
    {
      //	variable visible items
      if (obj.visible == 'variable')
      {
        obj.visibleConf.variable = true;
      }
      //	adjust string visible items
      else
      {
        obj.visibleConf.adjust = obj.visible;
      }
      obj.visible = false;
    }
    else if (is_function(obj.visible))
    {
      obj.visibleConf.adjust = obj.visible;
      obj.visible = false;
    }

    //	set items filter
    if (!is_string(obj.filter))
    {
      obj.filter = (itm.filter(':hidden').length > 0) ? ':visible' : '*';
    }

    //	primary item-size not set
    if (!obj[opt.d['width']])
    {
      //	responsive carousel -> set to largest
      if (opt.responsive)
      {
        debug(true, 'Set a '+opt.d['width']+' for the items!');
        obj[opt.d['width']] = ms_getTrueLargestSize(itm, opt, 'outerWidth');
      }
      //	 non-responsive -> measure it or set to "variable"
      else
      {
        obj[opt.d['width']] = (ms_hasVariableSizes(itm, opt, 'outerWidth'))
          ? 'variable'
          : itm[opt.d['outerWidth']](true);
      }
    }

    //	secondary item-size not set -> measure it or set to "variable"
    if (!obj[opt.d['height']])
    {
      obj[opt.d['height']] = (ms_hasVariableSizes(itm, opt, 'outerHeight'))
        ? 'variable'
        : itm[opt.d['outerHeight']](true);
    }

    obj.sizesConf.width = obj.width;
    obj.sizesConf.height = obj.height;
    return obj;
  }
  function in_complementVisibleItems(opt, avl) {
    //	primary item-size variable -> set visible items variable
    if (opt.items[opt.d['width']] == 'variable')
    {
      opt.items.visibleConf.variable = true;
    }
    if (!opt.items.visibleConf.variable) {
      //	primary size is number -> calculate visible-items
      if (is_number(opt[opt.d['width']]))
      {
        opt.items.visible = Math.floor(opt[opt.d['width']] / opt.items[opt.d['width']]);
      }
      //	measure and calculate primary size and visible-items
      else
      {
        opt.items.visible = Math.floor(avl / opt.items[opt.d['width']]);
        opt[opt.d['width']] = opt.items.visible * opt.items[opt.d['width']];
        if (!opt.items.visibleConf.adjust)
        {
          opt.align = false;
        }
      }
      if (opt.items.visible == 'Infinity' || opt.items.visible < 1)
      {
        debug(true, 'Not a valid number of visible items: Set to "variable".');
        opt.items.visibleConf.variable = true;
      }
    }
    return opt;
  }
  function in_complementPrimarySize(obj, opt, all) {
    //	primary size set to auto -> measure largest item-size and set it
    if (obj == 'auto')
    {
      obj = ms_getTrueLargestSize(all, opt, 'outerWidth');
    }
    return obj;
  }
  function in_complementSecondarySize(obj, opt, all) {
    //	secondary size set to auto -> measure largest item-size and set it
    if (obj == 'auto')
    {
      obj = ms_getTrueLargestSize(all, opt, 'outerHeight');
    }
    //	secondary size not set -> set to secondary item-size
    if (!obj)
    {
      obj = opt.items[opt.d['height']];
    }
    return obj;
  }
  function in_getAlignPadding(o, all) {
    var p = cf_getAlignPadding(gi_getCurrentItems(all, o), o);
    o.padding[o.d[1]] = p[1];
    o.padding[o.d[3]] = p[0];
    return o;
  }
  function in_getResponsiveValues(o, all, avl) {

    var visb = cf_getItemAdjustMinMax(Math.ceil(o[o.d['width']] / o.items[o.d['width']]), o.items.visibleConf);
    if (visb > all.length)
    {
      visb = all.length;
    }

    var newS = Math.floor(o[o.d['width']]/visb);

    o.items.visible = visb;
    o.items[o.d['width']] = newS;
    o[o.d['width']] = visb * newS;
    return o;
  }


  //	buttons functions
  function bt_pauseOnHoverConfig(p) {
    if (is_string(p))
    {
      var i = (p.indexOf('immediate') > -1) ? true : false,
        r = (p.indexOf('resume') 	> -1) ? true : false;
    }
    else
    {
      var i = r = false;
    }
    return [i, r];
  }
  function bt_mousesheelNumber(mw) {
    return (is_number(mw)) ? mw : null
  }

  //	helper functions
  function is_null(a) {
    return (a === null);
  }
  function is_undefined(a) {
    return (is_null(a) || typeof a == 'undefined' || a === '' || a === 'undefined');
  }
  function is_array(a) {
    return (a instanceof Array);
  }
  function is_jquery(a) {
    return (a instanceof jQuery);
  }
  function is_object(a) {
    return ((a instanceof Object || typeof a == 'object') && !is_null(a) && !is_jquery(a) && !is_array(a) && !is_function(a));
  }
  function is_number(a) {
    return ((a instanceof Number || typeof a == 'number') && !isNaN(a));
  }
  function is_string(a) {
    return ((a instanceof String || typeof a == 'string') && !is_undefined(a) && !is_true(a) && !is_false(a));
  }
  function is_function(a) {
    return (a instanceof Function || typeof a == 'function');
  }
  function is_boolean(a) {
    return (a instanceof Boolean || typeof a == 'boolean' || is_true(a) || is_false(a));
  }
  function is_true(a) {
    return (a === true || a === 'true');
  }
  function is_false(a) {
    return (a === false || a === 'false');
  }
  function is_percentage(x) {
    return (is_string(x) && x.slice(-1) == '%');
  }


  function getTime() {
    return new Date().getTime();
  }

  function deprecated( o, n ) {
    debug(true, o+' is DEPRECATED, support for it will be removed. Use '+n+' instead.');
  }
  function debug(d, m) {
    if (!is_undefined(window.console) && !is_undefined(window.console.log))
    {
      if (is_object(d))
      {
        var s = ' ('+d.selector+')';
        d = d.debug;
      }
      else
      {
        var s = '';
      }
      if (!d)
      {
        return false;
      }

      if (is_string(m))
      {
        m = 'carouFredSel'+s+': ' + m;
      }
      else
      {
        m = ['carouFredSel'+s+':', m];
      }
      //window.console.log(m);
    }
    return false;
  }



  //	EASING FUNCTIONS
  $.extend($.easing, {
    'quadratic': function(t) {
      var t2 = t * t;
      return t * (-t2 * t + 4 * t2 - 6 * t + 4);
    },
    'cubic': function(t) {
      return t * (4 * t * t - 9 * t + 6);
    },
    'elastic': function(t) {
      var t2 = t * t;
      return t * (33 * t2 * t2 - 106 * t2 * t + 126 * t2 - 67 * t + 15);
    }
  });


})(jQuery);




/*
 * jQuery FlexSlider v2.6.2
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;
(function ($) {

  var focused = true;

  //FlexSlider: Object Instance
  $.flexslider = function(el, options) {
    var slider = $(el);

    // making variables public
    slider.vars = $.extend({}, $.flexslider.defaults, options);

    var namespace = slider.vars.namespace,
      msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
      touch = (( "ontouchstart" in window ) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
      // depricating this idea, as devices are being released with both of these events
      eventType = "click touchend MSPointerUp keyup",
      watchedEvent = "",
      watchedEventClearTimer,
      vertical = slider.vars.direction === "vertical",
      reverse = slider.vars.reverse,
      carousel = (slider.vars.itemWidth > 0),
      fade = slider.vars.animation === "fade",
      asNav = slider.vars.asNavFor !== "",
      methods = {};

    // Store a reference to the slider object
    $.data(el, "flexslider", slider);

    // Private slider methods
    methods = {
      init: function() {
        slider.animating = false;
        // Get current slide and make sure it is a number
        slider.currentSlide = parseInt( ( slider.vars.startAt ? slider.vars.startAt : 0), 10 );
        if ( isNaN( slider.currentSlide ) ) { slider.currentSlide = 0; }
        slider.animatingTo = slider.currentSlide;
        slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
        slider.containerSelector = slider.vars.selector.substr(0,slider.vars.selector.search(' '));
        slider.slides = $(slider.vars.selector, slider);
        slider.container = $(slider.containerSelector, slider);
        slider.count = slider.slides.length;
        // SYNC:
        slider.syncExists = $(slider.vars.sync).length > 0;
        // SLIDE:
        if (slider.vars.animation === "slide") { slider.vars.animation = "swing"; }
        slider.prop = (vertical) ? "top" : "marginLeft";
        slider.args = {};
        // SLIDESHOW:
        slider.manualPause = false;
        slider.stopped = false;
        //PAUSE WHEN INVISIBLE
        slider.started = false;
        slider.startTimeout = null;
        // TOUCH/USECSS:
        slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function() {
          var obj = document.createElement('div'),
            props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
          for (var i in props) {
            if ( obj.style[ props[i] ] !== undefined ) {
              slider.pfx = props[i].replace('Perspective','').toLowerCase();
              slider.prop = "-" + slider.pfx + "-transform";
              return true;
            }
          }
          return false;
        }());
        slider.ensureAnimationEnd = '';
        // CONTROLSCONTAINER:
        if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
        // MANUAL:
        if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);

        // CUSTOM DIRECTION NAV:
        if (slider.vars.customDirectionNav !== "") slider.customDirectionNav = $(slider.vars.customDirectionNav).length === 2 && $(slider.vars.customDirectionNav);

        // RANDOMIZE:
        if (slider.vars.randomize) {
          slider.slides.sort(function() { return (Math.round(Math.random())-0.5); });
          slider.container.empty().append(slider.slides);
        }

        slider.doMath();

        // INIT
        slider.setup("init");

        // CONTROLNAV:
        if (slider.vars.controlNav) { methods.controlNav.setup(); }

        // DIRECTIONNAV:
        if (slider.vars.directionNav) { methods.directionNav.setup(); }

        // KEYBOARD:
        if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) {
          $(document).bind('keyup', function(event) {
            var keycode = event.keyCode;
            if (!slider.animating && (keycode === 39 || keycode === 37)) {
              var target = (keycode === 39) ? slider.getTarget('next') :
                (keycode === 37) ? slider.getTarget('prev') : false;
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }
          });
        }
        // MOUSEWHEEL:
        if (slider.vars.mousewheel) {
          slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
            event.preventDefault();
            var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
            slider.flexAnimate(target, slider.vars.pauseOnAction);
          });
        }

        // PAUSEPLAY
        if (slider.vars.pausePlay) { methods.pausePlay.setup(); }

        //PAUSE WHEN INVISIBLE
        if (slider.vars.slideshow && slider.vars.pauseInvisible) { methods.pauseInvisible.init(); }

        // SLIDSESHOW
        if (slider.vars.slideshow) {
          if (slider.vars.pauseOnHover) {
            slider.hover(function() {
              if (!slider.manualPlay && !slider.manualPause) { slider.pause(); }
            }, function() {
              if (!slider.manualPause && !slider.manualPlay && !slider.stopped) { slider.play(); }
            });
          }
          // initialize animation
          //If we're visible, or we don't use PageVisibility API
          if(!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden()) {
            (slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play();
          }
        }

        // ASNAV:
        if (asNav) { methods.asNav.setup(); }

        // TOUCH
        if (touch && slider.vars.touch) { methods.touch(); }

        // FADE&&SMOOTHHEIGHT || SLIDE:
        if (!fade || (fade && slider.vars.smoothHeight)) { $(window).bind("resize orientationchange focus", methods.resize); }

        slider.find("img").attr("draggable", "false");

        // API: start() Callback
        setTimeout(function(){
          slider.vars.start(slider);
        }, 200);
      },
      asNav: {
        setup: function() {
          slider.asNav = true;
          slider.animatingTo = Math.floor(slider.currentSlide/slider.move);
          slider.currentItem = slider.currentSlide;
          slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
          if(!msGesture){
            slider.slides.on(eventType, function(e){
              e.preventDefault();
              var $slide = $(this),
                target = $slide.index();
              var posFromLeft = $slide.offset().left - $(slider).scrollLeft(); // Find position of slide relative to left of slider container
              if( posFromLeft <= 0 && $slide.hasClass( namespace + 'active-slide' ) ) {
                slider.flexAnimate(slider.getTarget("prev"), true);
              } else if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
                slider.direction = (slider.currentItem < target) ? "next" : "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
              }
            });
          }else{
            el._slider = slider;
            slider.slides.each(function (){
              var that = this;
              that._gesture = new MSGesture();
              that._gesture.target = that;
              that.addEventListener("MSPointerDown", function (e){
                e.preventDefault();
                if(e.currentTarget._gesture) {
                  e.currentTarget._gesture.addPointer(e.pointerId);
                }
              }, false);
              that.addEventListener("MSGestureTap", function (e){
                e.preventDefault();
                var $slide = $(this),
                  target = $slide.index();
                if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                  slider.direction = (slider.currentItem < target) ? "next" : "prev";
                  slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                }
              });
            });
          }
        }
      },
      controlNav: {
        setup: function() {
          if (!slider.manualControls) {
            methods.controlNav.setupPaging();
          } else { // MANUALCONTROLS:
            methods.controlNav.setupManual();
          }
        },
        setupPaging: function() {
          var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
            j = 1,
            item,
            slide;

          slider.controlNavScaffold = $('<ol class="'+ namespace + 'control-nav ' + namespace + type + '"></ol>');

          if (slider.pagingCount > 1) {
            for (var i = 0; i < slider.pagingCount; i++) {
              slide = slider.slides.eq(i);
              if ( undefined === slide.attr( 'data-thumb-alt' ) ) { slide.attr( 'data-thumb-alt', '' ); }
              var altText = ( '' !== slide.attr( 'data-thumb-alt' ) ) ? altText = ' alt="' + slide.attr( 'data-thumb-alt' ) + '"' : '';
              item = (slider.vars.controlNav === "thumbnails") ? '<img src="' + slide.attr( 'data-thumb' ) + '"' + altText + '/>' : '<a href="#">' + j + '</a>';
              if ( 'thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions ) {
                var captn = slide.attr( 'data-thumbcaption' );
                if ( '' !== captn && undefined !== captn ) { item += '<span class="' + namespace + 'caption">' + captn + '</span>'; }
              }
              slider.controlNavScaffold.append('<li>' + item + '</li>');
              j++;
            }
          }

          // CONTROLSCONTAINER:
          (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
          methods.controlNav.set();

          methods.controlNav.active();

          slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();

          });
        },
        setupManual: function() {
          slider.controlNav = slider.manualControls;
          methods.controlNav.active();

          slider.controlNav.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        set: function() {
          var selector = (slider.vars.controlNav === "thumbnails") ? 'img' : 'a';
          slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
        },
        active: function() {
          slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
        },
        update: function(action, pos) {
          if (slider.pagingCount > 1 && action === "add") {
            slider.controlNavScaffold.append($('<li><a href="#">' + slider.count + '</a></li>'));
          } else if (slider.pagingCount === 1) {
            slider.controlNavScaffold.find('li').remove();
          } else {
            slider.controlNav.eq(pos).closest('li').remove();
          }
          methods.controlNav.set();
          (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
        }
      },
      directionNav: {
        setup: function() {
          var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li class="' + namespace + 'nav-prev"><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li class="' + namespace + 'nav-next"><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');

          // CUSTOM DIRECTION NAV:
          if (slider.customDirectionNav) {
            slider.directionNav = slider.customDirectionNav;
            // CONTROLSCONTAINER:
          } else if (slider.controlsContainer) {
            $(slider.controlsContainer).append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
          } else {
            slider.append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
          }

          methods.directionNav.update();

          slider.directionNav.bind(eventType, function(event) {
            event.preventDefault();
            var target;

            if (watchedEvent === "" || watchedEvent === event.type) {
              target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function() {
          var disabledClass = namespace + 'disabled';
          if (slider.pagingCount === 1) {
            slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
          } else if (!slider.vars.animationLoop) {
            if (slider.animatingTo === 0) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
            } else if (slider.animatingTo === slider.last) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
            } else {
              slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
            }
          } else {
            slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
          }
        }
      },
      pausePlay: {
        setup: function() {
          var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a href="#"></a></div>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            slider.controlsContainer.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
          } else {
            slider.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
          }

          methods.pausePlay.update((slider.vars.slideshow) ? namespace + 'pause' : namespace + 'play');

          slider.pausePlay.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              if ($(this).hasClass(namespace + 'pause')) {
                slider.manualPause = true;
                slider.manualPlay = false;
                slider.pause();
              } else {
                slider.manualPause = false;
                slider.manualPlay = true;
                slider.play();
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function(state) {
          (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
        }
      },
      touch: function() {
        var startX,
          startY,
          offset,
          cwidth,
          dx,
          startT,
          onTouchStart,
          onTouchMove,
          onTouchEnd,
          scrolling = false,
          localX = 0,
          localY = 0,
          accDx = 0;

        if(!msGesture){
          onTouchStart = function(e) {
            if (slider.animating) {
              e.preventDefault();
            } else if ( ( window.navigator.msPointerEnabled ) || e.touches.length === 1 ) {
              slider.pause();
              // CAROUSEL:
              cwidth = (vertical) ? slider.h : slider. w;
              startT = Number(new Date());
              // CAROUSEL:

              // Local vars for X and Y points.
              localX = e.touches[0].pageX;
              localY = e.touches[0].pageY;

              offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                  (carousel && slider.currentSlide === slider.last) ? slider.limit :
                    (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                      (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
              startX = (vertical) ? localY : localX;
              startY = (vertical) ? localX : localY;

              el.addEventListener('touchmove', onTouchMove, false);
              el.addEventListener('touchend', onTouchEnd, false);
            }
          };

          onTouchMove = function(e) {
            // Local vars for X and Y points.

            localX = e.touches[0].pageX;
            localY = e.touches[0].pageY;

            dx = (vertical) ? startX - localY : startX - localX;
            scrolling = (vertical) ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));

            var fxms = 500;

            if ( ! scrolling || Number( new Date() ) - startT > fxms ) {
              e.preventDefault();
              if (!fade && slider.transitions) {
                if (!slider.vars.animationLoop) {
                  dx = dx/((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx)/cwidth+2) : 1);
                }
                slider.setProps(offset + dx, "setTouch");
              }
            }
          };

          onTouchEnd = function(e) {
            // finish the touch by undoing the touch session
            el.removeEventListener('touchmove', onTouchMove, false);

            if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
              var updateDx = (reverse) ? -dx : dx,
                target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

              if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              } else {
                if (!fade) { slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true); }
              }
            }
            el.removeEventListener('touchend', onTouchEnd, false);

            startX = null;
            startY = null;
            dx = null;
            offset = null;
          };

          el.addEventListener('touchstart', onTouchStart, false);
        }else{
          el.style.msTouchAction = "none";
          el._gesture = new MSGesture();
          el._gesture.target = el;
          el.addEventListener("MSPointerDown", onMSPointerDown, false);
          el._slider = slider;
          el.addEventListener("MSGestureChange", onMSGestureChange, false);
          el.addEventListener("MSGestureEnd", onMSGestureEnd, false);

          function onMSPointerDown(e){
            e.stopPropagation();
            if (slider.animating) {
              e.preventDefault();
            }else{
              slider.pause();
              el._gesture.addPointer(e.pointerId);
              accDx = 0;
              cwidth = (vertical) ? slider.h : slider. w;
              startT = Number(new Date());
              // CAROUSEL:

              offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                  (carousel && slider.currentSlide === slider.last) ? slider.limit :
                    (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                      (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
            }
          }

          function onMSGestureChange(e) {
            e.stopPropagation();
            var slider = e.target._slider;
            if(!slider){
              return;
            }
            var transX = -e.translationX,
              transY = -e.translationY;

            //Accumulate translations.
            accDx = accDx + ((vertical) ? transY : transX);
            dx = accDx;
            scrolling = (vertical) ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));

            if(e.detail === e.MSGESTURE_FLAG_INERTIA){
              setImmediate(function (){
                el._gesture.stop();
              });

              return;
            }

            if (!scrolling || Number(new Date()) - startT > 500) {
              e.preventDefault();
              if (!fade && slider.transitions) {
                if (!slider.vars.animationLoop) {
                  dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
                }
                slider.setProps(offset + dx, "setTouch");
              }
            }
          }

          function onMSGestureEnd(e) {
            e.stopPropagation();
            var slider = e.target._slider;
            if(!slider){
              return;
            }
            if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
              var updateDx = (reverse) ? -dx : dx,
                target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

              if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              } else {
                if (!fade) { slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true); }
              }
            }

            startX = null;
            startY = null;
            dx = null;
            offset = null;
            accDx = 0;
          }
        }
      },
      resize: function() {
        if (!slider.animating && slider.is(':visible')) {
          if (!carousel) { slider.doMath(); }

          if (fade) {
            // SMOOTH HEIGHT:
            methods.smoothHeight();
          } else if (carousel) { //CAROUSEL:
            slider.slides.width(slider.computedW);
            slider.update(slider.pagingCount);
            slider.setProps();
          }
          else if (vertical) { //VERTICAL:
            slider.viewport.height(slider.h);
            slider.setProps(slider.h, "setTotal");
          } else {
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) { methods.smoothHeight(); }
            slider.newSlides.width(slider.computedW);
            slider.setProps(slider.computedW, "setTotal");
          }
        }
      },
      smoothHeight: function(dur) {
        if (!vertical || fade) {
          var $obj = (fade) ? slider : slider.viewport;
          (dur) ? $obj.animate({"height": slider.slides.eq(slider.animatingTo).innerHeight()}, dur).css('overflow', 'visible') : $obj.innerHeight(slider.slides.eq(slider.animatingTo).innerHeight());
        }
      },
      sync: function(action) {
        var $obj = $(slider.vars.sync).data("flexslider"),
          target = slider.animatingTo;

        switch (action) {
          case "animate": $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true); break;
          case "play": if (!$obj.playing && !$obj.asNav) { $obj.play(); } break;
          case "pause": $obj.pause(); break;
        }
      },
      uniqueID: function($clone) {
        // Append _clone to current level and children elements with id attributes
        $clone.filter( '[id]' ).add($clone.find( '[id]' )).each(function() {
          var $this = $(this);
          $this.attr( 'id', $this.attr( 'id' ) + '_clone' );
        });
        return $clone;
      },
      pauseInvisible: {
        visProp: null,
        init: function() {
          var visProp = methods.pauseInvisible.getHiddenProp();
          if (visProp) {
            var evtname = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
            document.addEventListener(evtname, function() {
              if (methods.pauseInvisible.isHidden()) {
                if(slider.startTimeout) {
                  clearTimeout(slider.startTimeout); //If clock is ticking, stop timer and prevent from starting while invisible
                } else {
                  slider.pause(); //Or just pause
                }
              }
              else {
                if(slider.started) {
                  slider.play(); //Initiated before, just play
                } else {
                  if (slider.vars.initDelay > 0) {
                    setTimeout(slider.play, slider.vars.initDelay);
                  } else {
                    slider.play(); //Didn't init before: simply init or wait for it
                  }
                }
              }
            });
          }
        },
        isHidden: function() {
          var prop = methods.pauseInvisible.getHiddenProp();
          if (!prop) {
            return false;
          }
          return document[prop];
        },
        getHiddenProp: function() {
          var prefixes = ['webkit','moz','ms','o'];
          // if 'hidden' is natively supported just return it
          if ('hidden' in document) {
            return 'hidden';
          }
          // otherwise loop over all the known prefixes until we find one
          for ( var i = 0; i < prefixes.length; i++ ) {
            if ((prefixes[i] + 'Hidden') in document) {
              return prefixes[i] + 'Hidden';
            }
          }
          // otherwise it's not supported
          return null;
        }
      },
      setToClearWatchedEvent: function() {
        clearTimeout(watchedEventClearTimer);
        watchedEventClearTimer = setTimeout(function() {
          watchedEvent = "";
        }, 3000);
      }
    };

    // public methods
    slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
      if (!slider.vars.animationLoop && target !== slider.currentSlide) {
        slider.direction = (target > slider.currentSlide) ? "next" : "prev";
      }

      if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

      if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
        if (asNav && withSync) {
          var master = $(slider.vars.asNavFor).data('flexslider');
          slider.atEnd = target === 0 || target === slider.count - 1;
          master.flexAnimate(target, true, false, true, fromNav);
          slider.direction = (slider.currentItem < target) ? "next" : "prev";
          master.direction = slider.direction;

          if (Math.ceil((target + 1)/slider.visible) - 1 !== slider.currentSlide && target !== 0) {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            target = Math.floor(target/slider.visible);
          } else {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            return false;
          }
        }

        slider.animating = true;
        slider.animatingTo = target;

        // SLIDESHOW:
        if (pause) { slider.pause(); }

        // API: before() animation Callback
        slider.vars.before(slider);

        // SYNC:
        if (slider.syncExists && !fromNav) { methods.sync("animate"); }

        // CONTROLNAV
        if (slider.vars.controlNav) { methods.controlNav.active(); }

        // !CAROUSEL:
        // CANDIDATE: slide active class (for add/remove slide)
        if (!carousel) { slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide'); }

        // INFINITE LOOP:
        // CANDIDATE: atEnd
        slider.atEnd = target === 0 || target === slider.last;

        // DIRECTIONNAV:
        if (slider.vars.directionNav) { methods.directionNav.update(); }

        if (target === slider.last) {
          // API: end() of cycle Callback
          slider.vars.end(slider);
          // SLIDESHOW && !INFINITE LOOP:
          if (!slider.vars.animationLoop) { slider.pause(); }
        }

        // SLIDE:
        if (!fade) {
          var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
            margin, slideString, calcNext;

          // INFINITE LOOP / REVERSE:
          if (carousel) {
            margin = slider.vars.itemMargin;
            calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
            slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
          } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") {
            slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
          } else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") {
            slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
          } else {
            slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
          }
          slider.setProps(slideString, "", slider.vars.animationSpeed);
          if (slider.transitions) {
            if (!slider.vars.animationLoop || !slider.atEnd) {
              slider.animating = false;
              slider.currentSlide = slider.animatingTo;
            }

            // Unbind previous transitionEnd events and re-bind new transitionEnd event
            slider.container.unbind("webkitTransitionEnd transitionend");
            slider.container.bind("webkitTransitionEnd transitionend", function() {
              clearTimeout(slider.ensureAnimationEnd);
              slider.wrapup(dimension);
            });

            // Insurance for the ever-so-fickle transitionEnd event
            clearTimeout(slider.ensureAnimationEnd);
            slider.ensureAnimationEnd = setTimeout(function() {
              slider.wrapup(dimension);
            }, slider.vars.animationSpeed + 100);

          } else {
            slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function(){
              slider.wrapup(dimension);
            });
          }
        } else { // FADE:
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeOut(slider.vars.animationSpeed, slider.vars.easing);
            //slider.slides.eq(target).fadeIn(slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

            slider.slides.eq(slider.currentSlide).css({"zIndex": 1, "display": "none"}).animate({"opacity": 0}, slider.vars.animationSpeed, slider.vars.easing);
            slider.slides.eq(target).css({"zIndex": 2, "display": "block"}).animate({"opacity": 1}, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

          } else {
            slider.slides.eq(slider.currentSlide).css({ "opacity": 0, "zIndex": 1, "display": "none" });
            slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2, "display": "block" });
            slider.wrapup(dimension);
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) { methods.smoothHeight(slider.vars.animationSpeed); }
      }
    };
    slider.wrapup = function(dimension) {
      // SLIDE:
      if (!fade && !carousel) {
        if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpEnd");
        } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpStart");
        }
      }
      slider.animating = false;
      slider.currentSlide = slider.animatingTo;
      // API: after() animation Callback
      slider.vars.after(slider);
    };

    // SLIDESHOW:
    slider.animateSlides = function() {
      if (!slider.animating && focused ) { slider.flexAnimate(slider.getTarget("next")); }
    };
    // SLIDESHOW:
    slider.pause = function() {
      clearInterval(slider.animatedSlides);
      slider.animatedSlides = null;
      slider.playing = false;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) { methods.pausePlay.update("play"); }
      // SYNC:
      if (slider.syncExists) { methods.sync("pause"); }
    };
    // SLIDESHOW:
    slider.play = function() {
      if (slider.playing) { clearInterval(slider.animatedSlides); }
      slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
      slider.started = slider.playing = true;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) { methods.pausePlay.update("pause"); }
      // SYNC:
      if (slider.syncExists) { methods.sync("play"); }
    };
    // STOP:
    slider.stop = function () {
      slider.pause();
      slider.stopped = true;
    };
    slider.canAdvance = function(target, fromNav) {
      // ASNAV:
      var last = (asNav) ? slider.pagingCount - 1 : slider.last;
      return (fromNav) ? true :
        (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
          (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
            (target === slider.currentSlide && !asNav) ? false :
              (slider.vars.animationLoop) ? true :
                (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
                  (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
                    true;
    };
    slider.getTarget = function(dir) {
      slider.direction = dir;
      if (dir === "next") {
        return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
      } else {
        return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
      }
    };

    // SLIDE:
    slider.setProps = function(pos, special, dur) {
      var target = (function() {
        var posCheck = (pos) ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo,
          posCalc = (function() {
            if (carousel) {
              return (special === "setTouch") ? pos :
                (reverse && slider.animatingTo === slider.last) ? 0 :
                  (reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                    (slider.animatingTo === slider.last) ? slider.limit : posCheck;
            } else {
              switch (special) {
                case "setTotal": return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                case "setTouch": return (reverse) ? pos : pos;
                case "jumpEnd": return (reverse) ? pos : slider.count * pos;
                case "jumpStart": return (reverse) ? slider.count * pos : pos;
                default: return pos;
              }
            }
          }());

        return (posCalc * -1) + "px";
      }());

      if (slider.transitions) {
        target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
        dur = (dur !== undefined) ? (dur/1000) + "s" : "0s";
        slider.container.css("-" + slider.pfx + "-transition-duration", dur);
        slider.container.css("transition-duration", dur);
      }

      slider.args[slider.prop] = target;
      if (slider.transitions || dur === undefined) { slider.container.css(slider.args); }

      slider.container.css('transform',target);
    };

    slider.setup = function(type) {
      // SLIDE:
      if (!fade) {
        var sliderOffset, arr;

        if (type === "init") {
          slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({"overflow": "hidden", "position": "relative"}).appendTo(slider).append(slider.container);
          // INFINITE LOOP:
          slider.cloneCount = 0;
          slider.cloneOffset = 0;
          // REVERSE:
          if (reverse) {
            arr = $.makeArray(slider.slides).reverse();
            slider.slides = $(arr);
            slider.container.empty().append(slider.slides);
          }
        }
        // INFINITE LOOP && !CAROUSEL:
        if (slider.vars.animationLoop && !carousel) {
          slider.cloneCount = 2;
          slider.cloneOffset = 1;
          // clear out old clones
          if (type !== "init") { slider.container.find('.clone').remove(); }
          slider.container.append(methods.uniqueID(slider.slides.first().clone().addClass('clone')).attr('aria-hidden', 'true'))
            .prepend(methods.uniqueID(slider.slides.last().clone().addClass('clone')).attr('aria-hidden', 'true'));
        }
        slider.newSlides = $(slider.vars.selector, slider);

        sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
        // VERTICAL:
        if (vertical && !carousel) {
          slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
          setTimeout(function(){
            slider.newSlides.css({"display": "block"});
            slider.doMath();
            slider.viewport.height(slider.h);
            slider.setProps(sliderOffset * slider.h, "init");
          }, (type === "init") ? 100 : 0);
        } else {
          slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
          slider.setProps(sliderOffset * slider.computedW, "init");
          setTimeout(function(){
            slider.doMath();
            slider.newSlides.css({"width": slider.computedW, "marginRight" : slider.computedM, "float": "left", "display": "block"});
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) { methods.smoothHeight(); }
          }, (type === "init") ? 100 : 0);
        }
      } else { // FADE:
        slider.slides.css({"width": "100%", "float": "left", "marginRight": "-100%", "position": "relative"});
        if (type === "init") {
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeIn(slider.vars.animationSpeed, slider.vars.easing);
            if (slider.vars.fadeFirstSlide == false) {
              slider.slides.css({ "opacity": 0, "display": "none", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2, "display": "block"}).css({"opacity": 1});
            } else {
              slider.slides.css({ "opacity": 0, "display": "none", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2, "display": "block"}).animate({"opacity": 1},slider.vars.animationSpeed,slider.vars.easing);
            }
          } else {
            slider.slides.css({ "opacity": 0, "display": "none", "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2, "display": "block"});
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) { methods.smoothHeight(); }
      }
      // !CAROUSEL:
      // CANDIDATE: active slide
      if (!carousel) { slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide"); }

      //FlexSlider: init() Callback
      slider.vars.init(slider);
    };

    slider.doMath = function() {
      var slide = slider.slides.first(),
        slideMargin = slider.vars.itemMargin,
        minItems = slider.vars.minItems,
        maxItems = slider.vars.maxItems;

      slider.w = (slider.viewport===undefined) ? slider.width() : slider.viewport.width();
      slider.h = slide.height();
      slider.boxPadding = slide.outerWidth() - slide.width();

      // CAROUSEL:
      if (carousel) {
        slider.itemT = slider.vars.itemWidth + slideMargin;
        slider.itemM = slideMargin;
        slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
        slider.maxW = (maxItems) ? (maxItems * slider.itemT) - slideMargin : slider.w;
        slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1)))/minItems :
          (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1)))/maxItems :
            (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;

        slider.visible = Math.floor(slider.w/(slider.itemW));
        slider.move = (slider.vars.move > 0 && slider.vars.move < slider.visible ) ? slider.vars.move : slider.visible;
        slider.pagingCount = Math.ceil(((slider.count - slider.visible)/slider.move) + 1);
        slider.last =  slider.pagingCount - 1;
        slider.limit = (slider.pagingCount === 1) ? 0 :
          (slider.vars.itemWidth > slider.w) ? (slider.itemW * (slider.count - 1)) + (slideMargin * (slider.count - 1)) : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
      } else {
        slider.itemW = slider.w;
        slider.itemM = slideMargin;
        slider.pagingCount = slider.count;
        slider.last = slider.count - 1;
      }
      slider.computedW = slider.itemW - slider.boxPadding;
      slider.computedM = slider.itemM;
    };

    slider.update = function(pos, action) {
      slider.doMath();

      // update currentSlide and slider.animatingTo if necessary
      if (!carousel) {
        if (pos < slider.currentSlide) {
          slider.currentSlide += 1;
        } else if (pos <= slider.currentSlide && pos !== 0) {
          slider.currentSlide -= 1;
        }
        slider.animatingTo = slider.currentSlide;
      }

      // update controlNav
      if (slider.vars.controlNav && !slider.manualControls) {
        if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
          methods.controlNav.update("add");
        } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
          if (carousel && slider.currentSlide > slider.last) {
            slider.currentSlide -= 1;
            slider.animatingTo -= 1;
          }
          methods.controlNav.update("remove", slider.last);
        }
      }
      // update directionNav
      if (slider.vars.directionNav) { methods.directionNav.update(); }

    };

    slider.addSlide = function(obj, pos) {
      var $obj = $(obj);

      slider.count += 1;
      slider.last = slider.count - 1;

      // append new slide
      if (vertical && reverse) {
        (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
      } else {
        (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.update(pos, "add");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      //FlexSlider: added() Callback
      slider.vars.added(slider);
    };
    slider.removeSlide = function(obj) {
      var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

      // update count
      slider.count -= 1;
      slider.last = slider.count - 1;

      // remove slide
      if (isNaN(obj)) {
        $(obj, slider.slides).remove();
      } else {
        (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.doMath();
      slider.update(pos, "remove");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      // FlexSlider: removed() Callback
      slider.vars.removed(slider);
    };

    //FlexSlider: Initialize
    methods.init();
  };

  // Ensure the slider isn't focussed if the window loses focus.
  $( window ).blur( function ( e ) {
    focused = false;
  }).focus( function ( e ) {
    focused = true;
  });

  //FlexSlider: Default Settings
  $.flexslider.defaults = {
    namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
    selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
    animation: "fade",              //String: Select your animation type, "fade" or "slide"
    easing: "swing",                //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
    direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
    reverse: false,                 //{NEW} Boolean: Reverse the animation direction
    animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
    smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
    startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
    slideshow: true,                //Boolean: Animate slider automatically
    slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
    animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
    initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
    randomize: false,               //Boolean: Randomize slide order
    fadeFirstSlide: true,           //Boolean: Fade in the first slide when animation type is "fade"
    thumbCaptions: false,           //Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

    // Usability features
    pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
    pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
    pauseInvisible: true,   		//{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
    useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
    touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
    video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

    // Primary Controls
    controlNav: true,               //Boolean: Create navigation for paging control of each slide? Note: Leave true for manualControls usage
    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
    prevText: "Previous",           //String: Set the text for the "previous" directionNav item
    nextText: "Next",               //String: Set the text for the "next" directionNav item

    // Secondary Navigation
    keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
    multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
    mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
    pausePlay: false,               //Boolean: Create pause/play dynamic element
    pauseText: "Pause",             //String: Set the text for the "pause" pausePlay item
    playText: "Play",               //String: Set the text for the "play" pausePlay item

    // Special properties
    controlsContainer: "",          //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
    manualControls: "",             //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
    customDirectionNav: "",         //{NEW} jQuery Object/Selector: Custom prev / next button. Must be two jQuery elements. In order to make the events work they have to have the classes "prev" and "next" (plus namespace)
    sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
    asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

    // Carousel Options
    itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
    itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
    minItems: 2,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
    maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
    move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
    allowOneSlide: true,           //{NEW} Boolean: Whether or not to allow a slider comprised of a single slide

    // Callback API
    start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
    before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
    after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
    end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
    added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
    removed: function(){},           //{NEW} Callback: function(slider) - Fires after a slide is removed
    init: function() {}             //{NEW} Callback: function(slider) - Fires after the slider is initially setup
  };

  //FlexSlider: Plugin Function
  $.fn.flexslider = function(options) {
    if (options === undefined) { options = {}; }

    if (typeof options === "object") {
      return this.each(function() {
        var $this = $(this),
          selector = (options.selector) ? options.selector : ".slides > li",
          $slides = $this.find(selector);

        if ( ( $slides.length === 1 && options.allowOneSlide === false ) || $slides.length === 0 ) {
          $slides.fadeIn(400);
          if (options.start) { options.start($this); }
        } else if ($this.data('flexslider') === undefined) {
          new $.flexslider(this, options);
        }
      });
    } else {
      // Helper strings to quickly perform functions on the slider
      var $slider = $(this).data('flexslider');
      switch (options) {
        case "play": $slider.play(); break;
        case "pause": $slider.pause(); break;
        case "stop": $slider.stop(); break;
        case "next": $slider.flexAnimate($slider.getTarget("next"), true); break;
        case "prev":
        case "previous": $slider.flexAnimate($slider.getTarget("prev"), true); break;
        default: if (typeof options === "number") { $slider.flexAnimate(options, true); }
      }
    }
  };
})(jQuery);








/**************************************************************
 * 본 파일에는 MIT License 으로 배포되는 jquery-popup-overlay 프로젝트의
 *  (jquery-popup-overlay-1.6.1.tar.gz/jquery-popup-overlay-1.6.1/jquery.popupoverlay.js)  소스코드를 일부 포함하며,
 * 해당 소스코드의 저작권 문구는 다음과 같습니다.
 **************************************************************/

/*!
 * jQuery Popup Overlay
 *
 * @version 1.6.1
 * @requires jQuery v1.7.1+
 * @link http://vast-engineering.github.com/jquery-popup-overlay/
 * @author Ivan Lazarevic, Vladimir Siljkovic, Branko Sekulic, Marko Jankovic
 */
(function ($) {

  var $window = $(window);
  var options = {};
  var zindexvalues = [];
  var lastclicked = [];
  var onevisible = false;
  var oneormorevisible = false;
  var scrollbarwidth;
  var focushandler = null;
  var blurhandler = null;
  var escapehandler = null;
  var bodymarginright = null;
  var opensuffix = '_open';
  var closesuffix = '_close';
  var focusedelementbeforepopup = null;

  var methods = {

    _init: function (el) {
      var $el = $(el);
      var options = $el.data('popupoptions');
      lastclicked[el.id] = false;
      zindexvalues[el.id] = 0;

      if (!$el.data('popup-initialized')) {
        $el.attr('data-popup-initialized', 'true');
        methods._initonce(el);
      }

      if (options.autoopen) {
        setTimeout(function() {
          methods.show(el, 0);
        }, 0);
      }
    },

    _initonce: function (el) {
      var $body = $('body');
      var $wrapper;
      var options = $el.data('popupoptions');
      bodymarginright = parseInt($body.css('margin-right'), 10);

      if (options.type == 'tooltip') {
        options.background = false;
        options.scrolllock = false;
      }

      if (options.scrolllock) {
        // Calculate the browser's scrollbar width dynamically
        var parent;
        var child;
        if (typeof scrollbarwidth === 'undefined') {
          parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
          child = parent.children();
          scrollbarwidth = child.innerWidth() - child.height(99).innerWidth();
          parent.remove();
        }
      }

      if (!$el.attr('id')) {
        $el.attr('id', 'j-popup-' + parseInt(Math.random() * 100000000));
      }

      $el.addClass('popup_content');

      $body.prepend(el);

      $el.wrap('<div id="' + el.id + '_wrapper" class="popup_wrapper" />');

      $wrapper = $('#' + el.id + '_wrapper');

      $wrapper.css({
        opacity: 0,
        visibility: 'hidden',
        position: 'absolute',
        overflow: 'auto'
      });

      $el.css({
        opacity: 0,
        visibility: 'hidden',
        display: 'inline-block'
      });

      if (options.setzindex && !options.autozindex) {
        $wrapper.css('z-index', '2001');
      }

      if (!options.outline) {
        $el.css('outline', 'none');
      }

      if (options.transition) {
        $el.css('transition', options.transition);
        $wrapper.css('transition', options.transition);
      }

      // Hide popup content from screen readers initially
      $(el).attr('aria-hidden', true);

      if ((options.background) && (!$('#' + el.id + '_background').length)) {

        var popupbackground = '<div id="' + el.id + '_background" class="popup_background"></div>';

        $body.prepend(popupbackground);

        var $background = $('#' + el.id + '_background');

        $background.css({
          opacity: 0,
          visibility: 'hidden',
          backgroundColor: options.color,
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        });

        if (options.setzindex && !options.autozindex) {
          $background.css('z-index', '2000');
        }

        if (options.transition) {
          $background.css('transition', options.transition);
        }
      }

      if (options.type == 'overlay') {
        $el.css({
          textAlign: 'left',
          position: 'relative',
          verticalAlign: 'middle'
        });

        $wrapper.css({
          position: 'fixed',
          //position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          textAlign: 'center'
        });

        // CSS vertical align helper
        $wrapper.append('<div class="popup_align" />');

        $('.popup_align').css({
          display: 'inline-block',
          verticalAlign: 'middle',
          height: '100%'
        });
      }

      // Add WAI ARIA role to announce dialog to screen readers
      $el.attr('role', 'dialog');

      var openelement =  (options.openelement) ? options.openelement : ('.' + el.id + opensuffix);

      $(openelement).each(function (i, item) {
        $(item).attr('data-popup-ordinal', i);

        if (!$(item).attr('id')) {
          $(item).attr('id', 'open_' + parseInt((Math.random() * 100000000), 10));
        }
      });

      // Set aria-labelledby (if aria-label or aria-labelledby is not set in html)
      if (!($el.attr('aria-labelledby') || $el.attr('aria-label'))) {
        $el.attr('aria-labelledby', $(openelement).attr('id'));
      }

      $(document).on('click', openelement, function (e) {
        if (!($el.data('popup-visible'))) {
          var ord = $(this).data('popup-ordinal');

          // Show element when clicked on `open` link.
          // setTimeout is to allow `close` method to finish (for issues with multiple tooltips)
          setTimeout(function() {
            methods.show(el, ord);
          }, 0);

          e.preventDefault();
        }
      });

      // Handler: `close` element
      var closeelement = (options.closeelement) ? options.closeelement : ('.' + el.id + closesuffix);
      $(document).on('click', closeelement, function (e) {
        methods.hide(el);
        e.preventDefault();
      });

      if (options.detach) {
        $el.hide().detach();
      } else {
        $wrapper.hide();
      }
    },

    /**
     * Show method
     *
     * @param {object} el - popup instance DOM node
     * @param {number} ordinal - order number of an `open` element
     */
    show: function (el, ordinal) {
      var $el = $(el);

      if ($el.data('popup-visible')) return;

      // Initialize if not initialized. Required for: $('#popup').popup('show')
      if (!$el.data('popup-initialized')) {
        methods._init(el);
      }
      $el.attr('data-popup-initialized', 'true');

      var $body = $('body');
      var options = $el.data('popupoptions');
      var $wrapper = $('#' + el.id + '_wrapper');
      var $background = $('#' + el.id + '_background');

      // `beforeopen` callback event
      callback(el, ordinal, options.beforeopen);

      // Remember last clicked place
      lastclicked[el.id] = ordinal;

      if (options.detach) {
        $wrapper.prepend(el);
        $el.show();
      } else {
        $wrapper.show();
      }

      setTimeout(function() {
        $wrapper.css({
          visibility: 'visible',
          opacity: 1
        });

        $('html').addClass('popup_visible').addClass('popup_visible_' + el.id);
        $el.addClass('popup_content_visible');
      }, 20);


      $el.css({
        'visibility': 'visible',
        'opacity': 1
      });

      // Disable background layer scrolling when popup is opened
      if (options.scrolllock) {
        $body.css('overflow', 'hidden');
        if ($body.height() > $window.height()) {
          $body.css('margin-right', bodymarginright + scrollbarwidth);
        }
      }

      setTimeout(function () {
        // Set event handlers
        if(!onevisible) {
          if (options.keepfocus) {
            $(document).on('focusin', focushandler)
          };

          if (options.blur) {
            $(document).on('click', blurhandler);
          }

          if (options.escape) {
            $(document).on('keydown', escapehandler);
          }
        }

        // Set plugin state
        if (!onevisible) {
          onevisible = true;
        } else {
          oneormorevisible = true;
        }
      }, 0);

      $el.data('popup-visible', true);

      // Position popup
      methods.reposition(el, ordinal);

      // Show background
      if (options.background) {
        $background.css({
          'visibility': 'visible',
          'opacity': options.opacity
        });

        // Fix IE8 issue with background not appearing
        setTimeout(function() {
          $background.css({
            'opacity': options.opacity
          });
        }, 0);
      }

      // Remember which element had focus before opening a popup
      focusedelementbeforepopup = document.activeElement;

      // Handler: Keep focus inside dialog box
      if (options.keepfocus) {

        // Make holder div focusable
        $el.attr('tabindex', -1);

        // Focus popup or user specified element.
        // Initial timeout of 50ms is set to give some time to popup to show after clicking on
        // `open` element, and after animation is complete to prevent background scrolling.
        setTimeout(function() {
          if (options.focuselement) {
            $(options.focuselement).focus();
          } else {
            $el.focus();
          }
        }, options.focusdelay);

        // Handler for keyboard focus
        focushandler = function(event) {
          var dialog = document.getElementById(el.id);
          if (!dialog.contains(event.target)) {
            event.stopPropagation();
            dialog.focus();
          }
        };
      }

      // Calculating maximum z-index
      if (options.autozindex) {

        var elements = document.getElementsByTagName('*');
        var len = elements.length;
        var maxzindex = 0;

        for(var i=0; i<len; i++){

          var elementzindex = $(elements[i]).css('z-index');

          if(elementzindex !== 'auto'){

            elementzindex = parseInt(elementzindex);

            if(maxzindex < elementzindex){
              maxzindex = elementzindex;
            }
          }
        }

        zindexvalues[el.id] = maxzindex;

        // Add z-index to the wrapper
        if (zindexvalues[el.id] > 0) {
          $wrapper.css({
            zIndex: (zindexvalues[el.id] + 2)
          });
        }

        // Add z-index to the background
        if (options.background) {
          if (zindexvalues[el.id] > 0) {
            $('#' + el.id + '_background').css({
              zIndex: (zindexvalues[el.id] + 1)
            });
          }
        }
      }

      // Handler: Hide popup if clicked outside of it
      if (options.blur) {
        blurhandler = function (e) {
          if (!$(e.target).parents().andSelf().is('#' + el.id)) {
            methods.hide(el);
          }
        };
      }

      // Handler: Close popup on ESC key
      if (options.escape) {
        escapehandler = function (e) {
          if (e.keyCode == 27 && $el.data('popup-visible')) {
            //methods.hide(el);
          }
        };
      }

      // Hide main content from screen readers
      $(options.pagecontainer).attr('aria-hidden', true);

      // Reveal popup content to screen readers
      $el.attr('aria-hidden', false);

      $wrapper.one('transitionend', function() {
        callback(el, ordinal, options.opentransitionend);
      });

      callback(el, ordinal, options.onopen);
    },

    /**
     * Hide method
     *
     * @param {object} el - popup instance DOM node
     */
    hide: function (el) {

      var $body = $('body');
      var $el = $(el);
      var options = $el.data('popupoptions');
      var $wrapper = $('#' + el.id + '_wrapper');
      var $background = $('#' + el.id + '_background');

      $el.data('popup-visible', false);

      if (oneormorevisible) {
        $('html').removeClass('popup_visible_' + el.id);
        oneormorevisible = false;
      } else {
        $('html').removeClass('popup_visible').removeClass('popup_visible_' + el.id);
        onevisible = false;
      }

      $el.removeClass('popup_content_visible');

      // Re-enable scrolling of background layer
      if (options.scrolllock) {
        setTimeout(function() {
          $body.css({
            overflow: 'visible',
            'margin-right': bodymarginright
          });
        }, 10); // 10ms added for CSS transition in Firefox which doesn't like overflow:auto
      }

      // Unbind blur handler
      if (options.blur) {
        $(document).off('click', blurhandler);
      }

      if (options.keepfocus) {

        // Unbind focus handler
        $(document).off('focusin', focushandler);

        // Focus back on saved element
        setTimeout(function() {
          if ($(focusedelementbeforepopup).is(':visible')) {
            focusedelementbeforepopup.focus();
          }
        }, 0);
      }

      // Unbind ESC key handler
      if (options.escape) {
        $(document).off('keydown', escapehandler);
      }

      // Hide popup
      $wrapper.css({
        'visibility': 'hidden',
        'opacity': 0
      });
      $el.css({
        'visibility': 'hidden',
        'opacity': 0
      });

      // Hide background
      if (options.background) {
        $background.css({
          'visibility': 'hidden',
          'opacity': 0
        });
      }

      // After closing CSS transition is over... (if transition is set and supported)
      $el.one('transitionend', function(e) {

        if (!($el.data('popup-visible'))) {
          if (options.detach) {
            $el.hide().detach();
          } else {
            $wrapper.hide();
          }
        }

        if (!options.notransitiondetach) {
          callback(el, lastclicked[el.id], options.closetransitionend);
        }
      });

      if (options.notransitiondetach) {
        if (options.detach) {
          $el.hide().detach();
        } else {
          $wrapper.hide();
        }
      }

      // Reveal main content to screen readers
      $(options.pagecontainer).attr('aria-hidden', false);

      // Hide popup content from screen readers
      $el.attr('aria-hidden', true);

      // `onclose` callback event
      callback(el, lastclicked[el.id], options.onclose);
    },

    /**
     * Toggle method
     *
     * @param {object} el - popup instance DOM node
     * @param {number} ordinal - order number of an `open` element
     */
    toggle: function (el, ordinal) {
      if ($el.data('popup-visible')) {
        methods.hide(el);
      } else {
        setTimeout(function() {
          methods.show(el, ordinal);
        }, 0);
      }
    },

    /**
     * Reposition method
     *
     * @param {object} el - popup instance DOM node
     * @param {number} ordinal - order number of an `open` element
     */
    reposition: function (el, ordinal) {
      var $el = $(el);
      var options = $el.data('popupoptions');
      var $wrapper = $('#' + el.id + '_wrapper');
      var $background = $('#' + el.id + '_background');

      ordinal = ordinal || 0;

      // Tooltip type
      if (options.type == 'tooltip') {
        $wrapper.css({
          'position': 'absolute'
        });

        var $elementclicked;
        if (options.triggerevent) {
          $elementclicked = $(options.triggerevent.target);
        } else if (options.openelement) {
          $elementclicked = $(options.openelement).filter('[data-popup-ordinal="' + ordinal + '"]');
        } else {
          $elementclicked = $('.' + el.id + opensuffix + '[data-popup-ordinal="' + ordinal + '"]');
        }

        var linkOffset = $elementclicked.offset();

        // Horizontal position for tooltip
        if (options.horizontal == 'right') {
          $wrapper.css('left', linkOffset.left + $elementclicked.outerWidth() + options.offsetleft);
        } else if (options.horizontal == 'leftedge') {
          $wrapper.css('left', linkOffset.left + $elementclicked.outerWidth() - $elementclicked.outerWidth() +  options.offsetleft);
        } else if (options.horizontal == 'left') {
          $wrapper.css('right', $(window).width() - linkOffset.left  - options.offsetleft);
        } else if (options.horizontal == 'rightedge') {
          $wrapper.css('right', $(window).width()  - linkOffset.left - $elementclicked.outerWidth() - options.offsetleft);
        } else {
          $wrapper.css('left', linkOffset.left + ($elementclicked.outerWidth() / 2) - ($el.outerWidth() / 2) - parseFloat($el.css('marginLeft')) + options.offsetleft);
        }

        // Vertical position for tooltip
        if (options.vertical == 'bottom') {
          $wrapper.css('top', linkOffset.top + $elementclicked.outerHeight() + options.offsettop);
        } else if (options.vertical == 'bottomedge') {
          $wrapper.css('top', linkOffset.top + $elementclicked.outerHeight() - $el.outerHeight() + options.offsettop);
        } else if (options.vertical == 'top') {
          $wrapper.css('bottom', $(window).height() - linkOffset.top - options.offsettop);
        } else if (options.vertical == 'topedge') {
          $wrapper.css('bottom', $(window).height() - linkOffset.top - $el.outerHeight() - options.offsettop);
        } else {
          $wrapper.css('top', linkOffset.top + ($elementclicked.outerHeight() / 2) - ($el.outerHeight() / 2) - parseFloat($el.css('marginTop')) + options.offsettop);
        }

        // Overlay type
      } else if (options.type == 'overlay') {

        // Horizontal position for overlay
        if (options.horizontal) {
          $wrapper.css('text-align', options.horizontal);
        } else {
          $wrapper.css('text-align', 'center');
        }

        // Vertical position for overlay
        if (options.vertical) {
          $el.css('vertical-align', options.vertical);
        } else {
          $el.css('vertical-align', 'middle');
        }
      }
    }

  };

  /**
   * Callback event calls
   *
   * @param {object} el - popup instance DOM node
   * @param {number} ordinal - order number of an `open` element
   * @param {function} func - callback function
   */
  var callback = function (el, ordinal, func) {
    var openelement =  (options.openelement) ? options.openelement : ('.' + el.id + opensuffix);
    var elementclicked = $(openelement + '[data-popup-ordinal="' + ordinal + '"]');
    if (typeof func == 'function') {
      func(elementclicked);
    }
  };

  /**
   * Plugin API
   */
  $.fn.popup = function (customoptions) {
    return this.each(function () {

      $el = $(this);

      if (typeof customoptions === 'object') {  // e.g. $('#popup').popup({'color':'blue'})
        var opt = $.extend({}, $.fn.popup.defaults, customoptions);
        $el.data('popupoptions', opt);
        options = $el.data('popupoptions');

        methods._init(this);

      } else if (typeof customoptions === 'string') { // e.g. $('#popup').popup('hide')
        if (!($el.data('popupoptions'))) {
          $el.data('popupoptions', $.fn.popup.defaults);
          options = $el.data('popupoptions');
        }

        methods[customoptions].call(this, this);

      } else { // e.g. $('#popup').popup()
        if (!($el.data('popupoptions'))) {
          $el.data('popupoptions', $.fn.popup.defaults);
          options = $el.data('popupoptions');
        }

        methods._init(this);

      }

    });
  };

  $.fn.popup.defaults = {
    type: 'overlay',
    autoopen: false,
    background: true,
    color: 'black',
    opacity: '0.25',
    horizontal: 'center',
    vertical: 'middle',
    offsettop: 0,
    offsetleft: 0,
    escape: true,
    blur: false,
    setzindex: true,
    autozindex: false,
    scrolllock: false,
    keepfocus: true,
    focuselement: null,
    focusdelay: 50,
    outline: false,
    pagecontainer: null,
    detach: false,
    openelement: null,
    closeelement: null,
    transition: '0.3s',
    triggerevent: null,
    notransitiondetach: false,
    beforeopen: function(){},
    onclose: function(){},
    onopen: function(){},
    opentransitionend: function(){},
    closetransitionend: function(){}
  };

})(jQuery);










/***********************************
 Nav Accordion Plugin v1.1.2
 ************************************/
(function($){ $.fn.navAccordion = function(options, callback){ this.each(function(){  var settings = $.extend({ expandButtonText : "+", collapseButtonText: "-", selectedExpand: "true", selectedClass: "selected", multipleLevels: "true", buttonWidth: "20%", buttonPosition: "right", slideSpeed: "fast", parentElement: "li", childElement: "ul", headersOnly: false, headersOnlyCheck: false, delayLink: false, delayAmount: null }, options);  var container = this, multi = settings.multipleLevels ? '': ' > ' + settings.childElement + ' > ';  $(container) .addClass('accordion-nav');  $(multi + settings.parentElement, container).each(function(){ if ( ($(this).contents(settings.childElement).length > 0 && settings.headersOnlyCheck == false) || (!($('> a', this).attr('href')) && settings.headersOnlyCheck == true) ) { $(this).addClass('has-subnav') .css('position', 'relative') .find('>a') .css('margin-' + settings.buttonPosition, settings.buttonWidth);  $(' > ' + settings.childElement, this) .before('<span class="accordion-btn-wrap"><span class="accordion-btn accordion-collapsed">' + settings.expandButtonText + '</span><span class="accordion-btn accordion-expanded">' + settings.collapseButtonText + '</span></span>');  $('.accordion-btn-wrap', this) .css({ 'width': settings.buttonWidth, 'position': 'absolute', 'top': 0, 'text-align': 'center', 'cursor': 'pointer', 'display': 'inline-block' }) .css(settings.buttonPosition, 0); $('.accordion-btn ', this) .css({ 'display': 'inline-block', 'width': '100%' }); $('.accordion-expanded', this) .css('display', 'none'); }  if (!($('> a', this).attr('href')) || settings.headersOnly){ $(this) .addClass('accordion-header-only') .find('.accordion-btn-wrap') .css({ 'width': '100%', 'text-align': settings.buttonPosition }) .find('.accordion-btn ') .css({ 'width': settings.buttonWidth, 'text-align': 'center' }); }  if (settings.delayLink && !settings.headersOnly) { var currentThis = this, speed = settings.delayAmount != null ? settings.delayAmount : settings.slideSpeed; if (speed == "fast") { speed = 200; } else if (speed == "slow") { speed = 600; } $('> a', currentThis).on('click',function(e){ if (!$('> .accordion-btn-wrap', currentThis).hasClass("accordion-active")) { e.preventDefault(); var href = $(this).attr('href'); clickToggle($('> .accordion-btn-wrap', currentThis)); setTimeout(function(){ window.location = href; }, speed) } }) }  });  var selectedNavAccordion = $(settings.parentElement + '.' + settings.selectedClass + ' > .accordion-btn-wrap', container);  var buttonheightResize = debounce(function(){ buttonheight(); expandSelected(); }, 250); $(window).on('resize', buttonheightResize);  buttonheight();  expandSelected();  $(container).on('click', '.accordion-btn-wrap', function(e) { e.preventDefault(); clickToggle(this); });  if (typeof callback == "function") { callback(); }   function clickToggle(element) { var nextChild = $(element).next(settings.childElement), currentExpandBtn = $('.accordion-expanded', element), currentCollapseBtn = $('.accordion-collapsed', element), parentObj = $(element).closest(settings.parentElement); if (nextChild.is(':visible')) { nextChild .slideUp(settings.slideSpeed); $(element) .removeClass('accordion-active'); currentExpandBtn .css('display', 'none'); currentCollapseBtn .css('display', 'inline-block'); parentObj.add(parentObj.siblings('.active')).add(parentObj.find('.active')).removeClass('active'); } else { $(element).closest(settings.childElement).find('.accordion-active') .removeClass('accordion-active') .next(settings.childElement) .slideUp(settings.slideSpeed).prev() .find('.accordion-expanded') .css('display', 'none') .parent().find('.accordion-collapsed') .css('display', 'inline-block'); parentObj.add(parentObj.siblings('.active')).add(parentObj.find('.active')).removeClass('active'); $(element) .addClass('accordion-active'); nextChild .slideToggle(settings.slideSpeed); currentExpandBtn .css('display', 'inline-block'); currentCollapseBtn .css('display', 'none'); parentObj.addClass('active'); } }  function expandSelected(){ if(settings.selectedExpand){ if(!settings.headersOnlyCheck){ selectedNavAccordion.find('.accordion-expanded') .css('display', 'inline-block'); selectedNavAccordion.find('.accordion-collapsed') .css('display', 'none'); selectedNavAccordion.addClass('accordion-active') .next(settings.childElement) .css('display', 'block'); selectedNavAccordion.closest(settings.parentElement) .addClass('active'); } else { $(settings.parentElement + '.' + settings.selectedClass + ' > ' + settings.childElement, container) .css('display', 'block'); $(settings.parentElement + '.' + settings.selectedClass).addClass('active'); } } }  function buttonheight(){ $('.accordion-btn', container).each(function(){ $(settings.parentElement + '.has-subnav > ' + settings.childElement, container) .css('display', 'block');  var parentItem = $(this).closest(settings.parentElement), lineheight =  $('> a', parentItem).innerHeight(); $(this) .css({'line-height': lineheight + 'px', 'height': lineheight});  $(settings.parentElement + ((settings.headersOnlyCheck) ? ' ' : '.has-subnav > ') + settings.childElement, container) .css('display', 'none'); $('.accordion-expanded') .css('display', 'none'); $('.accordion-collapsed') .css('display', 'inline-block'); }) }  function debounce(func, wait, immediate) { var timeout; return function() { var context = this, args = arguments; var later = function() { timeout = null; if (!immediate) func.apply(context, args); }; var callNow = immediate && !timeout; clearTimeout(timeout); timeout = setTimeout(later, wait); if (callNow) func.apply(context, args); }; };   }); } })(jQuery);




