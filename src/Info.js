import React, { Component } from 'react';

class Info extends Component {
	state = {
	    venue: null,
	    errInfo: ''
	}

	UNSAFE_componentWillReceiveProps(nextProps){
        // 当前地点标题
        let cur_loc_title = this.props.location.title;
        // 即将被筛选得到的地点标题
        let next_loc_title = nextProps.location.title;
        if(cur_loc_title && next_loc_title && cur_loc_title !== next_loc_title) {
            // 发起网络请求并更新 <Info />
            this.getVenuesInfo(nextProps.location);
        }
    }

	getVenuesInfo(location) {
		fetch(`https://api.foursquare.com/v2/venues/search?client_id=5FMOY1V3VBX2WGWVGSAZ1VW4T1IUEXNHQ00ODELQTTXGQXIG&client_secret=&v=20180323&limit=1&ll=${location.location.lat},${location.location.lng}`)
		    .then((response)=> {
		        return response.json()
		    })
		    .then(res=> {
		    	if (res && res.response && res.response.venues && res.response.venues.length > 0) {
		    		this.getVenue(res.response.venues[0])
		    	}
		    })
		    .catch(error=> {
		        this.setState({
		        	errInfo: '获取信息失败，请稍后重试···',
		        })
		    });
	}

	getVenue(venue) {
		fetch(`https://api.foursquare.com/v2/venues/${venue.id}?client_id=5FMOY1V3VBX2WGWVGSAZ1VW4T1IUEXNHQ00ODELQTTXGQXIG&client_secret=&v=20180323&limit=1`)
		    .then((response)=> {
		        return response.json()
		    })
		    .then(res=> {
		    	this.setState({
		    		venue: res.response.venue,
		    		errInfo: ''
		    	})
		    })
		    .catch(error=> {
		    	this.setState({
		    		errInfo: '获取信息失败，请稍后重试···',
		    	})
		    });
	}

	render() {
		const { location } = this.props
		const { venue, errInfo } = this.state
		return (
		  	<div>
		  		{errInfo? <div>{errInfo}</div>: null}
	  			{venue?
  				<div key={venue.id}>
  					<p>评论：{venue.rating}</p>
  					<p>名称：{venue.name}</p>
  					<p>国家：{venue.location.country}</p>
  					<p>城市：{venue.location.city}</p>
  					<p>地址：{venue.location.address}</p>
  					<p>编码：{venue.location.postalCode}</p>
  					<p>经度：{venue.location.lat}</p>
  					<p>纬度：{venue.location.lng}</p>
  					<p>附近人数：{venue.count}</p>
  					<p>场所类别：
  						{venue.categories.length> 0? venue.categories.map(categorie=> (
  								<span key={categorie.id}>{categorie.name}</span>
  							)): null}
  					</p>
  					<p>图片：{venue.bestPhoto? <img src={venue.bestPhoto.prefix + venue.bestPhoto.width + 'x' + venue.bestPhoto.height + venue.bestPhoto.suffix} alt={venue.bestPhoto && venue.bestPhoto.source? venue.bestPhoto.source.name: '地址图片'}/>: '暂无'}</p>
  				</div>
  				: '暂无信息'}
		 	</div>
		);
	}
}

export default Info;
