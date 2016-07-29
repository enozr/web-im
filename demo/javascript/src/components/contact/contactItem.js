var React = require("react");
var Avatar = require('../common/avatar');


module.exports = React.createClass({

    getInitialState: function () {
        var me = this;

        return {
            msg: '',
            avatar: ''
        };
    },

    handleIconCount: function ( count ) {
        var curCate = document.getElementById(this.props.cate).getElementsByTagName('i')[1];
        var curCateCount = curCate.getAttribute('count') / 1;
        curCateCount -= count;

        if ( curCateCount > 0 ) {
            curCate.style.display = 'block';
        } else {
            curCateCount = 0;
            curCate.style.display = 'none';
        }
        //curCate.setAttribute('count', curCateCount);
    },

    update: function () {
        var count = this.refs.count.getAttribute('count') / 1;
        this.handleIconCount(count);

        this.refs.count.style.display = 'none';
        this.refs.count.setAttribute('count', 0);
        this.refs.count.innerText = '';

        // 重复点击
        if ( this.props.id === Demo.selected ) {
            return;
        }

        if ( Demo.selectedCate !== 'friends' && Demo.selectedCate !== 'strangers' ) {
            Demo.selected = this.props.id;
        } else {
            Demo.selected = this.props.username;
        }

        // quit previous chatroom
        if ( Demo.currentChatroom ) {
            document.getElementById('wrapper' + Demo.currentChatroom).innerHTML = '';
            document.getElementById(Demo.currentChatroom).querySelector('em').innerHTML = '';

            Demo.conn.quitChatRoom({
                roomId : Demo.currentChatroom
            });

            Demo.currentChatroom = null;
        }

        if ( Demo.selectedCate === 'chatrooms' ) {

            // join chatroom
            Demo.conn.joinChatRoom({
                roomId : this.props.id
            });
        }

        this.props.update(Demo.selected);
    },

    render: function () {
        var className = this.props.cur === this.props.id ? ' selected' : '';

        return (
            <div id={this.props.id} className={'webim-contact-item' + className} onClick={this.update}>
                <Avatar src={this.props.src} />
                {this.props.username}
                <em></em>
                <i ref='count' count='0' className='webim-msg-prompt' style={{display: 'none'}}></i>
            </div>
        );
    }
});
