import React, { useEffect, useState } from 'react';
import { Tooltip, Icon } from 'antd';

export default function LikeDislike(props) {
	const [ LikeAction, setLikeAction ] = useState(null);
	const [ DislikeAction, setDislikeAction ] = useState(null);
	return (
		<React.Fragment>
			<span key='comment-basic-like'>
				<Tooltip title='Like'>
					<Icon type='like' theme={LikeAction === 'liked' ? 'filled' : 'outlined'} onClick />
				</Tooltip>
				<span style={{ paddingLeft: '8px', cursor: 'auto' }}>Like</span>
			</span>&nbsp;
			<span key='comment-basic-dislike'>
				<Tooltip title='Dislike'>
					<Icon type='dislike' theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'} onClick />
				</Tooltip>
				<span style={{ paddingLeft: '8px', cursor: 'auto' }}>Dislike</span>
			</span>
		</React.Fragment>
	);
}
