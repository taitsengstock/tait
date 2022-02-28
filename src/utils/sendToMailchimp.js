import jsonp from 'jsonp'
import { mailchimpUrl, mailchimpUser, mailchimpId } from './constants'

function encode(data) {
	return Object.keys(data)
		.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
		.join('&')
}

const sendToMailchimp = (email, fname, lname, callback) => {

	const mailchimpAjaxAction = `${mailchimpUrl}/subscribe/post-json?u=${mailchimpUser}&amp;id=${mailchimpId}&`

	let dataObj = {
		EMAIL: email,
	}

	if(fname) dataObj = {...dataObj, FNAME: fname}

	if(lname) dataObj = {...dataObj, LNAME: lname}

	const data = encode(dataObj)

	jsonp(`${mailchimpAjaxAction}${data}`, { param: 'c' }, (err, data) => {
		callback(err, data)
	})
}

export default sendToMailchimp
