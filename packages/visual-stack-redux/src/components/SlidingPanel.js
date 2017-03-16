import React, { Component, PropTypes } from 'react';
import R  from 'ramda';
import { connect } from 'react-redux';
import {
  SlidingPanel as BaseSlidingPanel,
  SlidingPanelHeader as BaseSlidingPanelHeader,
  SlidingPanelSection as BaseSlidingPanelSection,
  ToggleIcon as BaseToggleIcon,
} from '@cjdev/visual-stack/lib/components/SlidingPanel';
import { toggleSlidingPanel } from '../actions';

export class InternalSlidingPanel extends Component {
  static propTypes = {
    active: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.handleClick = e => {
      const clickInPanel = this.panelRef.contains(e.target);
      if (!clickInPanel && this.props.active) {
        this.props.toggleSlidingPanel();
      }
    };
  }
  componentDidMount() {
    document.addEventListener('click', this.handleClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }
  render() {
    return (
      <div ref={panel => { this.panelRef = panel; }}>
        <BaseSlidingPanel
          active={this.props.active || false} >
          { this.props.children }
        </BaseSlidingPanel>
      </div>
    );
  }
}
export const SlidingPanel = connect(
  state => ({ active: state.visualStack.slidingPanel.active }),
  { toggleSlidingPanel }
)(InternalSlidingPanel);

export class InternalToggleIcon extends Component {
  constructor(props) {
    super(props);
    const eventSupportsPropagation = R.view(R.lensPath(['nativeEvent', 'stopImmediatePropagation']));
    this.handleClick = e => {
      if (eventSupportsPropagation(e)) e.nativeEvent.stopImmediatePropagation();
      this.props.toggleSlidingPanel();
    };
  }
  render() {
    return (
      <BaseToggleIcon onClick={this.handleClick} />
    );
  }
}

export const ToggleIcon = connect(
  null,
  { toggleSlidingPanel }
)(InternalToggleIcon);

export const SlidingPanelHeader = BaseSlidingPanelHeader;
export const SlidingPanelSection = BaseSlidingPanelSection;

