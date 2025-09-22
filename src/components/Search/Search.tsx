import SearchIcon from "../../assets/images/icon-search.svg";

export function Search() {
  return (
    <>
      <form
        className='search' 
        role="search" 
        aria-label='Site search'
      >
        <div className="search__section">
          <img 
            src={SearchIcon} 
            alt="" 
            role="presentation" 
            className='search__icon'
          />
          <input 
            type='search'
            className='search__input'
            placeholder='Seacrh for a place...'
            aria-label='Search'
          />
        </div>
        
        <button type="submit" className="search__button">Search</button>
      </form>   
    </> 
  );
}