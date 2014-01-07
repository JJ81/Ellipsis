/*
 * Implement text ellipsis effect without CSS(CSS ellipsis only can make one line, but it overcomes limitation) in mobile environment used by jQuery
 * https://page.kakao.com/store/kakaopage
 * Copyright 2014 'J' in Podotree, Inc.
 * Email : jj81.corp@gmail.com
 * Released under the MIT license
 * Date: 2014-01-02
 */

(function ($) {
	$.fn.ellipsisJ = function(options) {

		settings = {
				"lineCheckerClass" : null,
				"limitedLineNumber" : 2,
				"ellipsisType" : "..."
		};

		if(options) $.extend(settings, options);

		if(settings.lineCheckerClass == null || $("." + settings.lineCheckerClass +"")[0] === undefined) throw "There\'s no lineCheckerClass or insert it correctly again";

		tmpTextContainer = [],index = 0,
		oneLineHeight = (function() {
			return $("."+settings.lineCheckerClass+"").height();
		})();
		
		function getTarget(target) {this._target = target;}

		getTarget.prototype = {
				getText : function () {return this._target.text();},
	
				compareLineHeight : function (maxLineHeight) {
					if(this._target.height() > maxLineHeight) this.deleteText(tmpTextContainer[index], index); else console.log("pass or completed.");
				},
				
				deleteText : function(originalText, index) {
					originalText = originalText.substring(0, originalText.length-4);
					originalText += settings.ellipsisType;
					tmpTextContainer[index] = originalText;
					this._target.text(originalText);
					this.compareLineHeight(oneLineHeight*settings.limitedLineNumber);
				}
		};
		
		return this.each(function() {
			_this = $(this);
			var model = new getTarget(_this);			
			tmpTextContainer[index] = model.getText();
			model.compareLineHeight(oneLineHeight*settings.limitedLineNumber);
			index++;
		});
	};
})(jQuery);
