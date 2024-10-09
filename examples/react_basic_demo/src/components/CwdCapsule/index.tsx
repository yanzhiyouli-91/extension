import React, { CSSProperties, FC, useEffect, useMemo, useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import styles from './index.module.less';


export interface CwdCapsuleProps {
  data?: Array<any>;
  value?: string;
  onChange?: (value: string) => void;
  style?: CSSProperties;
  className?: string;
}

const CwdCapsule: FC<CwdCapsuleProps> = (props) => {
  const {
    data = [],
    value,
    style,
    className,
    onChange = () => {},
    ...rest
  } = props;
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    if (value && value !== selectedValue) {
      setSelectedValue(value);
    }
  }, [value]);

  const rootClassName = useMemo(() => {
    return [
      styles.capsuleBox,
      className || ''
    ].join(' ').trim();
  }, [className]);

  const handleItemClick = (item) => {
    setSelectedValue(item.value);
    onChange(item.value);
  };

  return (
    <div
      {...rest}
      style={style}
      className={rootClassName}
    >
      <div className={styles.capsule}>
        {
          data.map((item) => (
            <div
              className={[styles.item, selectedValue === item.value ? styles.active : ''].join(' ').trim()}
              key={item.value}
              onClick={() => handleItemClick(item)}
            >
              {item.label}
            </div>
          ))
        }
      </div>
    </div>
  );
}

CwdCapsule.defaultProps = {
  data: [
    { label: "月销售统计", value: "month" },
    { label: "年销售统计", value: "year" },
  ],
};

export default withErrorBoundary(CwdCapsule, {
  fallback: (<div>CwdCapsule render error</div>),
});
