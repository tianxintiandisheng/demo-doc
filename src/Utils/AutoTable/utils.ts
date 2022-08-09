export const getResidueHeightByDom = () => {
  const bodyHeight = document.body.offsetHeight; // 网页可见区域高 (包括边线的高)
  const headerHeight = 64; // header高度
  const breadcrumbHeight = 36 + 16 * 2; // 面包屑高度(包括间距)
  const tabHeight = 46 + 16; // tab高度(包括间距)
  const actionHeight = (document.getElementById('action') as HTMLElement).offsetHeight; // 操作区域高度
  const actionMarginBottomHeight = 16; // 操作区域-底部外边距
  const tableHeaderHeight = 55; // table-表头高度
  const paginationHeight = 32 + 16 * 2; // 分页器高度(包括间距)
  const contentBottomPadding = 24; // content区域的底部padding
  const tabContentTopPadding = 24; // tab子元素区域上padding
  const tabContentBottomPadding = 24; // tab子元素区域下padding
  const residueHeight =
    bodyHeight -
    headerHeight -
    breadcrumbHeight -
    tabHeight -
    actionHeight -
    tableHeaderHeight -
    actionMarginBottomHeight -
    paginationHeight -
    contentBottomPadding -
    tabContentTopPadding -
    tabContentBottomPadding;
  window.console.log('Dom-residueHeight', residueHeight);
  return residueHeight;
};

export const getResidueHeightByDOMRect = () => {
  debugger;
  const bodyHeight = document.body.offsetHeight; // 网页可见区域高 (包括边线的高)
  const tableBodyTop = document
    .getElementsByClassName('ant-table-body')[0]
    .getBoundingClientRect().top; // tableBody距离顶部距离
  const paginationHeight = 32 + 16 * 2; // 分页器高度(包括间距);
  const tabContentBottomPadding = 24; // tab子元素区域下padding
  const contentBottomPadding = 24; // content区域的底部padding
  const residueHeight =
    bodyHeight - tableBodyTop - paginationHeight - contentBottomPadding - tabContentBottomPadding;
  window.console.log('DOMRect-residueHeight', residueHeight);
  return residueHeight;
};
