define(function (require, exports, module) {

    var keyCode = {
            leftArrow: 37,
            rightArrow: 39
        },
        minBlockWidth = 100 + 5,
        minBlockHeight = minBlockWidth,
        getSlideSize = function () {
            var slide = angular.element('.slide').first(),
                $window = angular.element(window),
                padding = 70 * 2;
            if (slide.length === 0) {
                return {
                    height: $window.height() - padding,
                    width: $window.width() - padding
                };
            }

            return {
                height: slide.height(),
                width: slide.width()
            }
        },
        getSizeInfo = function () {
            var slideSize = getSlideSize(),
                slideWidth = slideSize.width,
                slideHeight = slideSize.height;

            return {
                maxColumns: Math.floor(slideWidth / minBlockWidth),
                maxRows: Math.floor(slideHeight / minBlockHeight)
            };
        },
        getDefaultSlide = function () {
            var sizeInfo = getSizeInfo();

            return {
                cards: [
                    {row: 1, col: 1, sizex: Math.floor(sizeInfo.maxColumns * 0.8), sizey: Math.ceil(sizeInfo.maxRows * 0.3)},
                    {row: 1, col: sizeInfo.maxColumns, sizex: 2, sizey: sizeInfo.maxRows - 1},
                    {row: 2, col: 1, sizex: Math.floor(sizeInfo.maxColumns * 0.4), sizey: Math.ceil(sizeInfo.maxRows * 0.3)},
                    {row: 2, col: 3, sizex: Math.floor(sizeInfo.maxColumns * 0.4), sizey: Math.ceil(sizeInfo.maxRows * 0.3)},
                    {row: 3, col: 3, sizex: Math.floor(sizeInfo.maxColumns * 0.8), sizey: 1},
                    {row: 3, col: 3, sizex: 2, sizey: 1}
                ]
            };
        },
        getSlide = function (numberOfItems) {
            var sizeInfo = getSizeInfo(),
                cards = [
                    {row: 1, col: sizeInfo.maxColumns, sizex: 1, sizey: 1}
                ],
                index = 1;

            while (index < numberOfItems) {
                cards.push({row: 1, col: 1, sizex: 1, sizey: 1});
                index++;
            }

            return {
                cards: cards
            };
        };

    exports.name = 'SlidesCtrl';

    exports.controller = function ($scope, $location, $document) {

        function setCurrentSlide(deltaIndex) {
            var slideCount = $scope.slides.length,
                index = $scope.currentSlide + deltaIndex;

            if (index < 0) {
                $scope.currentSlide = slideCount - 1;
            } else if (index >= slideCount) {
                $scope.currentSlide = 0;
            } else {
                $scope.currentSlide = index;
            }
            $scope.$apply();
        }

        $scope.currentSlide = 0;

        $document.keydown(function (e) {
            switch (e.keyCode) {
                case keyCode.leftArrow:
                    setCurrentSlide(-1);
                    e.preventDefault();
                    e.stopPropagation();
                    break;
                case keyCode.rightArrow:
                    setCurrentSlide(1);
                    e.preventDefault();
                    e.stopPropagation();
                    break;
            }
        });

        $scope.slides = [
            getDefaultSlide()
        ];

        $scope.popover = {
            saved: false,
            numberOfCards: '',
            addSlide: function () {
                $scope.slides = [getSlide(this.numberOfCards || 5)].concat($scope.slides);
                this.numberOfCards = '';
                this.saved = true;
            }
        };
    };
});
