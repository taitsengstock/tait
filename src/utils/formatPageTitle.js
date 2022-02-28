const formatPageTitle = (title, metaTitle, siteTitle) => {
	if(metaTitle){
		return metaTitle
	}
	if(title === 'Home' || title === siteTitle){
		return siteTitle
	}
	if(title){
		return `${title} | ${siteTitle}`
	}
	return siteTitle
}

export default formatPageTitle