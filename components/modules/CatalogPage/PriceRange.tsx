import { $mode } from '@/context/mode'
import styles from '@/styles/catalog/index.module.scss'
import { IPriceLowAndMax } from '@/types/catalog'
import { useStore } from 'effector-react'
import { getTrackBackground, Range } from 'react-range'

const STEP = 0.1


const PriceRange = ({
    allItemsLowAndMaxPrice,
    setAllItemsLowAndMaxPrice,
    setIsPriceRangeChanged,
    maxPrice,
}: IPriceLowAndMax) => {
    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const handlePriceRangeChange = (values: number[]) => {
        setIsPriceRangeChanged(true)
        setAllItemsLowAndMaxPrice(values)
    }


    return (
        <div className={styles.filters__price}>
            <div className={`${styles.filters__price__inputs} ${darkModeClass}`}>
                <input
                    type="text"
                    value={Math.ceil(allItemsLowAndMaxPrice[0])}
                    placeholder={'от'}
                    readOnly
                />
                <span className={styles.filters__price__inputs__border} />
                <input
                    type="text"
                    value={Math.ceil(allItemsLowAndMaxPrice[1])}
                    placeholder={'до'}
                    readOnly
                />
            </div>
            <Range
                values={allItemsLowAndMaxPrice}
                step={STEP}
                min={0}
                max={maxPrice || 100000}
                onChange={handlePriceRangeChange}
                renderTrack={({ props, children }) => (
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                            ...props.style,
                            height: 'auto',
                            display: 'flex',
                            width: '100%',
                            padding: '0 10px 20px 10px',
                        }}
                    >
                        <div
                            ref={props.ref}
                            style={{
                                height: '5px',
                                width: '100%',
                                borderRadius: '4px',
                                background: getTrackBackground({
                                    values: allItemsLowAndMaxPrice,
                                    colors: ['#B1CEFA', '#247CC8', '#B1CEFA'],
                                    min: 0,
                                    max: maxPrice || 100000,
                                }),
                                alignSelf: 'center',
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                        }}
                    >
                        <div
                            style={{
                                height: '20px',
                                width: '20px',
                                borderRadius: '50%',
                                background: '#FFFFFF',
                                border: '3px solid #1C629E',
                                boxShadow: '0px 12px 8px -6px rgba(174, 181, 239, 0.2)',
                            }}
                        />
                    </div>
                )}
            />
        </div>
    )
}

export default PriceRange