import AppMessageEvent from './app-message-event';
import store from '@/store';

/**
 * 好友邀请消息处理
 */
class RevokeEvent extends AppMessageEvent {

  resource;

  /**
   * 初始化构造方法
   * 
   * @param {Object} resource Socket消息
   */
  constructor(resource) {
    super();

    this.resource = resource;
  }

  handle() {
    if (!this.isChatting(this.resource.source, this.resource.receive_id, this.resource.user_id)) {
      return false;
    }

    let record_id = this.resource.record_id;
    let index = store.state.dialogue.records.findIndex((item) => item.id === record_id);

    store.commit('UPDATE_DIALOGUE', {
      index,
      item: {
        is_revoke: 1
      },
    });
  }
}

export default RevokeEvent;