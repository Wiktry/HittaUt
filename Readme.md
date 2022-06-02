# How to use API

**Login**
* Type
	* Post
* URL
	* https://www.orientering.se/api/v1/hittaut/user/login/
* Body
	{
		"username": email,
		"password": password
	}
* Response
	* User info
	* Location id

**Authentication**
* Type
	* Post
* URL
	* https://www.orientering.se/api-token-auth/
* Body
	{
		"username": email
		"password": password
	}
* Response
	* Auth token
	
**Companies**
* Type
	* Get
* URL
	* https://www.orientering.se/api/v1/companies/{ Location id }
* Response
	* All companies in that location

**Hitta Ut Static**
* Type
	* Get
* URL
	* https://www.orientering.se/hittaut_static/?location_id={ Location id }&token={ Auth Token }
* Response
	* Webpage
	* Omaps id

**Omaps info**
* Type
	* Get
* URL
	* https://www.orientering.se/api/v1/omaps/{ Omaps id }
* Response
	* XML
	* Matrix
		* ows:Identifier
			* Identifier of Zoom level and map id
		* TileWidth & TileHeight
			* 1024
		* MatrixWidth & MatrixHeight
			* Size of matrix

**Omaps map**
* Type
	* Get
* URL
	* https://api.omaps.net/maps/{ Omaps id }/wmts/tiles/{ ows:Identifier }/{ Row id }/{ Column id }
* Response
	* .png