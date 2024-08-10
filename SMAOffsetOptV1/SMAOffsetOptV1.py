from freqtrade.strategy.interface import IStrategy
from typing import Dict, List
from functools import reduce
from pandas import DataFrame
import talib.abstract as ta
import numpy as np
import freqtrade.vendor.qtpylib.indicators as qtpylib
import datetime
from technical.util import resample_to_interval, resampled_merge
from datetime import datetime, timedelta
from freqtrade.persistence import Trade
from freqtrade.strategy import stoploss_from_open, merge_informative_pair, DecimalParameter, IntParameter, CategoricalParameter
ma_types = {'SMA': ta.SMA, 'EMA': ta.EMA}

class SMAOffsetOptV1(IStrategy):
    INTERFACE_VERSION = 3
    buy_params = {'base_nb_candles_buy': 34, 'buy_trigger': 'SMA', 'low_offset': 0.9}
    sell_params = {'base_nb_candles_sell': 30, 'high_offset': 1.012, 'sell_trigger': 'EMA'}
    stoploss = -0.5
    minimal_roi = {'0': 0.1, '60': 0.07, '90': 0.056, '220': 0}
    base_nb_candles_buy = IntParameter(5, 80, default=buy_params['base_nb_candles_buy'], space='buy', optimize=False, load=True)
    base_nb_candles_sell = IntParameter(5, 80, default=sell_params['base_nb_candles_sell'], space='sell', optimize=False, load=True)
    low_offset = DecimalParameter(0.8, 0.99, default=buy_params['low_offset'], space='buy', optimize=False, load=True)
    high_offset = DecimalParameter(0.8, 1.1, default=sell_params['high_offset'], space='sell', optimize=False, load=True)
    buy_trigger = CategoricalParameter(ma_types.keys(), default=buy_params['buy_trigger'], space='buy', optimize=False, load=True)
    sell_trigger = CategoricalParameter(ma_types.keys(), default=sell_params['sell_trigger'], space='sell', optimize=False, load=True)
    trailing_stop = True
    trailing_stop_positive = 0.02
    trailing_stop_positive_offset = 0.051
    trailing_only_offset_is_reached = True
    timeframe = '5m'
    use_exit_signal = True
    exit_profit_only = False
    process_only_new_candles = True
    startup_candle_count = 50
    plot_config = {'main_plot': {'ma_offset_buy': {'color': 'orange'}, 'ma_offset_sell': {'color': 'orange'}}}
    use_custom_stoploss = False

    def custom_stoploss(self, pair: str, trade: 'Trade', current_time: datetime, current_rate: float, current_profit: float, **kwargs) -> float:
        return 1

    def populate_indicators(self, dataframe: DataFrame, metadata: dict) -> DataFrame:
        if not self.config['runmode'].value == 'hyperopt':
            dataframe['ma_offset_buy'] = ma_types[self.buy_trigger.value](dataframe, int(self.base_nb_candles_buy.value)) * self.low_offset.value
            dataframe['ma_offset_sell'] = ma_types[self.sell_trigger.value](dataframe, int(self.base_nb_candles_sell.value)) * self.high_offset.value
        return dataframe

    def populate_entry_trend(self, dataframe: DataFrame, metadata: dict) -> DataFrame:
        if self.config['runmode'].value == 'hyperopt':
            dataframe['ma_offset_buy'] = ma_types[self.buy_trigger.value](dataframe, int(self.base_nb_candles_buy.value)) * self.low_offset.value
        dataframe.loc[qtpylib.crossed_above(dataframe['close'], dataframe['ma_offset_buy']) & (dataframe['volume'] > 0), 'enter_long'] = 1
        return dataframe

    def populate_exit_trend(self, dataframe: DataFrame, metadata: dict) -> DataFrame:
        if self.config['runmode'].value == 'hyperopt':
            # --- Do not remove these libs ---
            # --------------------------------
            # author @tirail
            # hyperopt and paste results here
            # Buy hyperspace params:
            # buy_params = {
            # 	"base_nb_candles_buy": 34,
            # 	"buy_trigger": 'SMA',
            # 	"low_offset": 0.957,
            # }
            # Sell hyperspace params:
            # sell_params = {
            # 	"base_nb_candles_sell": 50,
            # 	"high_offset": 0.846,
            # 	"sell_trigger": 'SMA',
            # }
            # Sell hyperspace params:
            # Stoploss:
            # ROI table:
            # Trailing stop:
            # Optimal timeframe for the strategy
            # (dataframe['close'].shift(1) < dataframe['ma_offset_buy']) &
            #             (dataframe['low'] < dataframe['ma_offset_buy']) &
            #             (dataframe['close'] > dataframe['ma_offset_buy']) &
            # (dataframe['close'] < dataframe['ma_offset_buy']) &
            dataframe['ma_offset_sell'] = ma_types[self.sell_trigger.value](dataframe, int(self.base_nb_candles_sell.value)) * self.high_offset.value  #(dataframe['close'] > dataframe['ma_offset_sell']) &
        dataframe.loc[qtpylib.crossed_below(dataframe['close'], dataframe['ma_offset_sell']) & (dataframe['volume'] > 0), 'exit_long'] = 1
        return dataframe