using System.Collections.Generic;

namespace JobsLedger.DATA.DataServices
{
    /// <summary>
    /// A class that wraps the paginated list along with the paginated information
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class PagedList<T>
    {
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="list">The total paginated list</param>
        /// <param name="page">(optional) The current page number</param>
        /// <param name="pageSize">(optional) The size of the page</param>
        /// <param name="totalNoOfItems">(optional) Total number of items in list</param>
        /// <param name="totalNoOfPages">(optional) Total number of pages in the list</param>
        /// <param name="sortBy">(optional) Which Column sorted by</param>
        /// <param name="sortDirection">(optional) Whick direction sort column sorted by</param>
        public PagedList(IEnumerable<T> list,
                         int page,
                         int pageSize,
                         int totalNoOfItems,
                         int totalNoOfPages,
                         string sortBy,
                         string sortDirection)
        {
            Items = list;
            CurrentPage = page;
            PageSize = pageSize;
            TotalItemCount = totalNoOfItems;
            TotalPageCount = totalNoOfPages;
            SortBy = sortBy;
            SortDirection = sortDirection;
        }

        /// <summary>
        /// The paginated viewmodel result
        /// </summary>
        public IEnumerable<T> Items { get; private set; }

        /// <summary>
        ///  The current page.
        /// </summary>
        public int CurrentPage { get; private set; }

        /// <summary>
        /// The size of the page.
        /// </summary>
        public int PageSize { get; private set; }

        /// <summary>
        /// The total number of items in the original no paginated list of items.
        /// </summary>
        public int TotalItemCount { get; private set; }

        /// <summary>
        /// The total number of pages in the original no paginated list of items.
        /// </summary>
        public int TotalPageCount { get; private set; }

        /// <summary>
        /// The sort column of the original no paginated list of items.
        /// </summary>
        public string SortBy { get; private set; }

        /// <summary>
        /// The sort direction of the original no paginated list of items
        /// </summary>
        public string SortDirection { get; private set; }
            }
}